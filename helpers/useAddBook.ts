import Author from '@/models/Author'
import Book from '@/models/Book'
import { BookData } from '@/types/books'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect } from 'react'
import { Subject } from 'rxjs'

const bookAddSubject = new Subject<BookData>()

export default function useAddBookObservable() {
  const database = useDatabase()

  const addBook = (bookData: BookData) => {
    bookAddSubject.next(bookData)
  }

  useEffect(() => {
    const subscription = bookAddSubject.subscribe({
      next: async (bookData: BookData) => {
        await database.write(async () => {
          const booksCollection = database.collections.get<Book>('books')
          const authorsCollection = database.collections.get<Author>('authors')

          const book = await booksCollection.create((book) => {
            book.title = bookData.title
            book.description = bookData.description
            book.pageCount = bookData.pages
            book.cover = bookData.cover
            book.isbn10 = bookData.isbn10
            book.isbn13 = bookData.isbn13
          })

          bookData.authors?.forEach(async (authorName: string) => {
            await authorsCollection.create((author) => {
              author.book_id = book.id
              author.name = authorName
            })
          })
        })
      },
    })
    return () => subscription.unsubscribe()
  }, [database, bookAddSubject])

  return { addBook }
}
