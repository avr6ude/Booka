import Author from '@/models/Author'
import Book from '@/models/Book'
import { Q } from '@nozbe/watermelondb'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { createRef, useCallback, useEffect, useState } from 'react'
import { LayoutAnimation } from 'react-native'
import { Observable, switchMap } from 'rxjs'
import BookCard from '../components/BookCard'
import CommonHeader from '../components/CommonHeader'
import useRemoveBook from '../helpers/useRemoveBook'

type BookWithAuthors = {
  id: string
  title: string
  authors: string[]
  cover: string
  pageCount: number
  description: string
}

export default function SavedBooksScreen() {
  const database = useDatabase()
  const [books, setBooks] = useState<BookWithAuthors[]>([])
  const { removeBook } = useRemoveBook()
  const list = createRef<FlashList<BookWithAuthors>>()

  const getBooksObservable = useCallback(() => {
    const bookCollection = database.collections.get<Book>('books')
    const observable = bookCollection.query().observe()
    return new Observable<Book[]>((subscriber) => {
      const subscription = observable.subscribe({
        next: (books) => subscriber.next(books),
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      })
      return () => subscription.unsubscribe()
    })
  }, [database])

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
        switchMap((books: Book[]) =>
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
                cover: book.cover,
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
  }, [getBooksObservable, database])

  const renderItem = ({ item }: { item: BookWithAuthors }) => {
    const title = item.title
    const authors = item.authors
    const img = item.cover
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
            buttonIcon="trash-outline"
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
