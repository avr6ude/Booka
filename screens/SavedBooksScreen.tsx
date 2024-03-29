import { SafeAreaView } from 'dripsy'
import CommonHeader from '../components/CommonHeader'
import { FlashList } from '@shopify/flash-list'
import BookCard from '../components/BookCard'
import useRemoveBook from '../helpers/useRemoveBook'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { createRef, useEffect, useState } from 'react'
import Book from '@/models/Book'
import Author from '@/models/Author'
import { Q } from '@nozbe/watermelondb'
import { from, switchMap } from 'rxjs'
import { MotiView, AnimatePresence } from 'moti'
import { LayoutAnimation } from 'react-native'

export default function SavedBooksScreen() {
  const database = useDatabase()
  const [books, setBooks] = useState<any>([]) // fix type
  const removeBook = useRemoveBook()
  const list = createRef<FlashList<Book>>()

  function getBooksObservable() {
    const bookCollection = database.collections.get<Book>('books')
    return from(bookCollection.query().observe())
  }
  function handleRemoveBook(bookId: string) {
    setTimeout(() => {
      removeBook(bookId)
      list.current?.prepareForLayoutAnimationRender()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, 10)
  }

  useEffect(() => {
    const subscription = getBooksObservable()
      .pipe(
        switchMap((books) =>
          Promise.all(
            books.map(async (book) => {
              const authorsQuery = database.collections
                .get<Author>('authors')
                .query(Q.where('book_id', book.id))
              const authors = await authorsQuery.fetch()
              return {
                id: book.id,
                title: book.title,
                authors: authors.map((author) => author.name),
                thumbnail: book.thumbnail,
                pageCount: book.pageCount,
                description: book.description,
              }
            })
          )
        )
      )
      .subscribe({
        next: (booksWithAuthors) => {
          setBooks(booksWithAuthors)
        },
        error: (err) => console.error('Error fetching books:', err),
      })

    return () => subscription.unsubscribe()
  }, [])

  const renderItem = ({ item }: { item: Book }) => {
    const title = item.title
    const authors = item.authors
    const img = item.thumbnail
    const pages = item.pageCount
    const description = item.description

    return (
      <AnimatePresence>
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          key={item.id}
        >
          <BookCard
            title={title}
            pageCount={pages}
            thumbnail={img}
            description={description}
            authors={authors}
            buttonTitle="-"
            buttonOnPress={() => handleRemoveBook(item.id)}
          />
        </MotiView>
      </AnimatePresence>
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
        ref={list}
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  )
}
