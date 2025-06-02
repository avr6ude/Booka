import { getBooks } from '@/services/database'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { createRef, useCallback, useEffect, useState } from 'react'
import { LayoutAnimation } from 'react-native'
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
  const [books, setBooks] = useState<BookWithAuthors[]>([])
  const { removeBook } = useRemoveBook()
  const list = createRef<FlashList<BookWithAuthors>>()

  const loadBooks = useCallback(async () => {
    try {
      const loadedBooks = await getBooks()
      setBooks(loadedBooks)
    } catch (error) {
      console.error('Error loading books:', error)
    }
  }, [])

  function handleRemoveBook(bookId: string) {
    setTimeout(() => {
      removeBook(bookId)
      list.current?.prepareForLayoutAnimationRender()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, 10)
  }

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Saved Books" />
      <AnimatePresence>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ flex: 1 }}
        >
          <FlashList
            ref={list}
            data={books}
            estimatedItemSize={200}
            renderItem={({ item }) => (
              <BookCard
                key={item.id}
                title={item.title}
                authors={item.authors}
                thumbnail={item.cover}
                description={item.description}
                pageCount={item.pageCount}
                buttonIcon="trash-outline"
                buttonOnPress={() => handleRemoveBook(item.id)}
              />
            )}
          />
        </MotiView>
      </AnimatePresence>
    </SafeAreaView>
  )
}
