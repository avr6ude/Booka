import { useBookSearch } from '@/api/api'
import { isBookInDbObservable } from '@/helpers/isBookInDb'
import useRemoveBook from '@/helpers/useRemoveBook'
import { BookData } from '@/types/books'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { FlashList } from '@shopify/flash-list'
import { TextInput, View, useSx } from 'dripsy'
import { useEffect, useState } from 'react'
import useAddBook from '../helpers/useAddBook'
import BookCard from './BookCard'
import Button from './Button'
import CardLoader from './CardLoader'
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

  const [query, setQuery] = useState<string>('a')
  const { data, isError, isLoading, refetch } = useBookSearch(query)

  const handleSearch = async () => {
    if (query.length > 0) {
      refetch()
    }
  }

  const { addBook } = useAddBook()
  const removeBook = useRemoveBook()

  const SearchBar = () => {
    return (
      <View sx={container}>
        <TextInput
          style={searchBarStyles}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        <Button round onPress={handleSearch} iconName="search" iconSize={20} />
      </View>
    )
  }
  const BookItem = ({ item }: { item: BookData }) => {
    const database = useDatabase()
    const [isAdded, setAdded] = useState<any>(false)

    useEffect(() => {
      const id = [item.id]
      const subscription = isBookInDbObservable(database, id).subscribe({
        next: (added) => setAdded(added),
        error: (error) => {
          console.error('Failed to check if book is in db', error)
        },
      })

      return () => subscription.unsubscribe()
    }, [item])

    const handleAddBook = async () => {
      if (isAdded) {
        await removeBook(item.id)
        setAdded(false)
      } else {
        addBook(item)
        setAdded(true)
      }
    }

    const title = item.title
    const authors = item.authors
    const img = item.cover
    const pages = item.pages
    const description = item.description

    return (
      <BookCard
        title={title}
        authors={authors}
        thumbnail={img}
        description={description}
        pageCount={pages}
        buttonOnPress={() => handleAddBook()}
        buttonIcon={isAdded ? 'checkmark' : 'add'}
      />
    )
  }
  //fix L116 to use as a component <SearchBar />}
  return (
    <>
      <SearchBar />
      <View style={{ height: '100%', flex: 1 }}>
        <FlashList
          data={data}
          renderItem={({ item }) =>
            isLoading ? <CardLoader /> : <BookItem item={item} />
          }
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </>
  )
}
