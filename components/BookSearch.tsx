import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { View, TextInput, useSx } from 'dripsy'
import useAddBook from '../helpers/useAddBook'
import BookCard from './BookCard'
import Button from './Button'
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
  const [added, setAdded] = useState<boolean>(false)

  const addBook = useAddBook()

  const handleAddBook = (item: BookData) => {
    addBook(item)
    setAdded(true)
  }

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
  const renderItem = ({ item }: { item: BookData }) => {
    const title = item.volumeInfo.title
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    const pages = item.volumeInfo.pageCount
    const description = item.volumeInfo.description

    return (
      <View>
        <BookCard
          title={title}
          authors={authors}
          pageCount={pages}
          thumbnail={img}
          buttonLabel={added ? '-' : '+'}
          description={description}
          buttonOnPress={() => handleAddBook(item)}
          onPress={() => {}}
        />
      </View>
    )
  }
  //fix L104 to use as a component <SearchBar />}
  return (
    <>
      {SearchBar()}
      <View style={{ height: '100%', flex: 1 }}>
        <FlashList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </>
  )
}
