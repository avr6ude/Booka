import { removeBook as removeBookFromDb } from '@/services/database'

export default function useRemoveBook() {
  const removeBook = async (bookId: string) => {
    try {
      await removeBookFromDb(bookId)
    } catch (error) {
      console.error('Error removing book:', error)
    }
  }

  return { removeBook }
}
