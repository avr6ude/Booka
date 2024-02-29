import { FlashList } from '@shopify/flash-list'
import { useRef, useState } from 'react'
import { View, TextInput, useSx } from 'dripsy'
import useAddBook from '../helpers/useAddBook'
import BookCard from './BookCard'
import Button from './Button'
import { useAtom } from 'jotai'
import useRemoveBook from '@/helpers/useRemoveBook'
export default function BookSearch() {
  const sx = useSx()

  const container = sx({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 32,
    backgroundColor: '$background',
    shadowColor: '$text',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,
  })

  const searchBarStyles = sx({
    flex: 1,
    backgroundColor: '$background',
    color: '$text',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  })

  const [query, setQuery] = useState<string>('')
  const [books, setBooks] = useState<BookData[]>([])

  const { addBook } = useAddBook()
  const removeBook = useRemoveBook()

  const uri = 'https://www.googleapis.com/books/v1/volumes?q='

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const res = await fetch(uri + encodeURIComponent(query))
        const json = await res.json()
        setBooks(json.items || [])
      } catch (e) {
        console.error(e)
      }
    }
  }

  function SearchBar() {
    return (
      <View sx={container}>
        <TextInput
          style={searchBarStyles}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Button round onPress={handleSearch} iconName="search" iconSize={20} />
      </View>
    )
  }

  const BookItem = ({ item }: { item: BookData }) => {
    const lastBookId = useRef(item.id)
    const [isAdded, setAdded] = useState<boolean>(false)

    if (item.id !== lastBookId.current) {
      lastBookId.current = item.id
      setAdded(false)
    }

    const handleAddBook = () => {
      if (isAdded) {
        removeBook(item.id)
      } else {
        addBook(item)
      }
      setAdded(!isAdded)
    }

    const title = item.volumeInfo.title
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    const pages = item.volumeInfo.pageCount
    const description = item.volumeInfo.description

    return (
      <BookCard
        title={title}
        authors={authors}
        pageCount={pages}
        thumbnail={img}
        description={description}
        buttonOnPress={() => handleAddBook()}
        buttonTitle={isAdded ? '✓' : '+'}
      />
    )
  }
  //fix L104 to use as a component <SearchBar />}
  return (
    <>
      {SearchBar()}
      <View style={{ height: '100%', flex: 1 }}>
        <FlashList
          data={books}
          renderItem={({ item }) => <BookItem item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </>
  )
}
