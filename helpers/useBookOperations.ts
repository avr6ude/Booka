import {
  addBook as addBookToDb,
  removeBook as removeBookFromDb,
} from '@/services/database'
import { BookData } from '@/types/books'
import { useCallback } from 'react'
import useSync from './useSync'

export default function useBookOperations() {
  const { syncBooks } = useSync()

  const addBook = useCallback(
    async (bookData: BookData) => {
      try {
        await addBookToDb(bookData)
        await syncBooks()
      } catch (error) {
        console.error('Failed to add book:', error)
        throw error
      }
    },
    [syncBooks]
  )

  const removeBook = useCallback(
    async (bookId: string) => {
      try {
        await removeBookFromDb(bookId)
        await syncBooks()
      } catch (error) {
        console.error('Failed to remove book:', error)
        throw error
      }
    },
    [syncBooks]
  )

  return { addBook, removeBook }
}
