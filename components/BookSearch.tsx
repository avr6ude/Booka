import useBookOperations from '@/helpers/useBookOperations'
import { getBooks, isBookInDb } from '@/services/database'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { Text, View } from 'dripsy'
import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import CardLoader from './CardLoader'
import SearchBar from './SearchBar'

export default function BookSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const { addBook, removeBook } = useBookOperations()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', searchQuery],
    queryFn: () => getBooks(searchQuery),
    enabled: searchQuery.length > 0,
  })

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const BookItem = ({ item }: { item: any }) => {
    const [isAdded, setIsAdded] = useState<boolean>(false)

    useEffect(() => {
      const checkBookInDb = async () => {
        try {
          const exists = await isBookInDb(item.id)
          setIsAdded(exists)
        } catch (error) {
          console.error('Failed to check if book is in db', error)
        }
      }
      checkBookInDb()
    }, [item.id])

    const handleAddBook = async () => {
      if (isAdded) {
        await removeBook(item.id)
        setIsAdded(false)
      } else {
        await addBook(item)
        setIsAdded(true)
      }
    }

    return (
      <BookCard
        title={item.title}
        authors={item.authors}
        thumbnail={item.cover}
        description={item.description}
        pageCount={item.pages}
        buttonOnPress={handleAddBook}
        buttonIcon={isAdded ? 'checkmark' : 'add'}
      />
    )
  }

  return (
    <View
      style={{
        height: '100%',
        flex: 1,
        width: '100%',
      }}
    >
      <SearchBar onSearch={setSearchQuery} />
      {isError ? (
        <Text sx={{ textAlign: 'center' }}>
          Something went wrong. Please, try again later.
        </Text>
      ) : !data ? (
        <Text sx={{ textAlign: 'center' }}>No books found</Text>
      ) : (
        <FlashList
          data={data || []}
          renderItem={({ item }) =>
            isLoading ? <CardLoader /> : <BookItem item={item} />
          }
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      )}
    </View>
  )
}
