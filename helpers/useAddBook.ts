import { addBook as addBookToDb } from '@/services/database'
import { BookData } from '@/types/books'

export default function useAddBook() {
  const addBook = async (bookData: BookData) => {
    try {
      await addBookToDb(bookData)
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  return { addBook }
}
