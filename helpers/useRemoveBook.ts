import { useAtom } from "jotai"
import { bookStore } from "../stores/bookStore"

export default function useRemoveBook () {
  const [, setBooks] = useAtom(bookStore)

  const removeBook = (book: Book) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id))
  }

  return removeBook
}