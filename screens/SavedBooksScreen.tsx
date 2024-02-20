import { SafeAreaView, View } from 'react-native'
import CommonHeader from '../components/CommonHeader'
import { FlashList } from '@shopify/flash-list'
import truncateEnd from '../helpers/truncateEnd'
import BookCard from '../components/BookCard'
import useRemoveBook from '../helpers/useRemoveBook'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect, useState } from 'react'
import Book from '@/model/Book'

export default function SavedBooksScreen() {
  const database = useDatabase()
  const [books, setBooks] = useState<Book[]>([])
  const removeBook = useRemoveBook()

  useEffect(() => {
    const fetchBooks = async () => {
      const bookCollection = database.collections.get<Book>('books')
      const fetchedBooks = await bookCollection.query().fetch()
      setBooks(fetchedBooks)
    }

    fetchBooks()
  }, [database])
  const renderItem = ({ item }: { item: Book }) => {
    const title = truncateEnd(item.title, 50)
    //const authors = item.authors
    const img = item.thumbnail
    const pages = item.pageCount
    const description = item.description
    return (
      <View>
        <BookCard
          title={title}
          pageCount={pages}
          img={img}
          description={description}
          //authors={authors}
          buttonLabel="-"
          buttonOnPress={() => removeBook(item)}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="My books" />
      <FlashList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  )
}
