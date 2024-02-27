import { SafeAreaView, View } from 'dripsy'
import CommonHeader from '../components/CommonHeader'
import { FlashList } from '@shopify/flash-list'
import truncateEnd from '../helpers/truncateEnd'
import BookCard, { BookProps } from '../components/BookCard'
import useRemoveBook from '../helpers/useRemoveBook'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect, useState } from 'react'
import Book from '@/models/Book'
import Author from '@/models/Author'
import { Q } from '@nozbe/watermelondb'

export default function SavedBooksScreen() {
  const database = useDatabase()
  const [books, setBooks] = useState<any>([])
  const removeBook = useRemoveBook()

  useEffect(() => {
    const fetchBooks = async () => {
      const bookCollection = database.collections.get<Book>('books')
      const authorsCollection = database.collections.get<Author>('authors')
      const fetchedBooks = await bookCollection.query().fetch()

      const booksWithAuthors = await Promise.all(
        fetchedBooks.map(async (book) => {
          const authors = await authorsCollection
            .query(Q.where('book_id', book.id))
            .fetch()

          const authorNames = authors.map((author) => author.name)

          const bookData = {
            id: book.id,
            title: book.title,
            authors: authorNames,
            thumbnail: book.thumbnail,
            pageCount: book.pageCount,
            description: book.description,
          }

          return bookData
        })
      )

      setBooks(booksWithAuthors)
    }

    fetchBooks()
  }, [database])
  const renderItem = ({ item }: { item: Book }) => {
    const title = item.title
    const authors = item.authors
    const img = item.thumbnail
    const pages = item.pageCount
    const description = item.description

    return (
      <BookCard
        title={title}
        pageCount={pages}
        thumbnail={img}
        description={description}
        authors={authors}
        buttonLabel="-"
        buttonOnPress={() => removeBook(item.id)}
      />
    )
  }

  return (
    <SafeAreaView
      sx={{
        backgroundColor: '$background',
      }}
      style={{ flex: 1 }}
    >
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
