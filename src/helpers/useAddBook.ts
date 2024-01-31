import { useAtom } from "jotai";
import { bookStore } from "../stores/bookStore";

export default function useAddBook () {
  const [, setBooks] = useAtom(bookStore)

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook])
  }

  return addBook
}