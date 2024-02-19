import { useAtom } from 'jotai'
import { bookStore } from '../stores/bookStore'

export default function useAddBook() {
  const [, setBooks] = useAtom(bookStore)

  const addBook = (book: BookData) => {
    setBooks((prevBooks) => [...prevBooks, book])
  }

  return addBook
}
