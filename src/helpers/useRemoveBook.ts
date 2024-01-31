import { useAtom } from "jotai"
import { bookStore } from "../stores/bookStore"

export default function useRemoveBook () {
  const [, setBooks] = useAtom(bookStore)

  const removeBook = () => {
    setBooks((prevBooks) => prevBooks.slice(0, -1))
  }

  return removeBook
}