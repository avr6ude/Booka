import Author from '@/models/Author'
import Book from '@/models/Book'
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
          const book = await booksCollection.create((book) => {
            book.title = bookData.volumeInfo.title
            book.description = bookData.volumeInfo.description
            book.pageCount = bookData.volumeInfo.pageCount
            book.smallThumbnail = bookData.volumeInfo.imageLinks?.smallThumbnail
            book.thumbnail = bookData.volumeInfo.imageLinks?.thumbnail
          })

          const authorsCollection = database.collections.get<Author>('authors')
          bookData.volumeInfo.authors?.forEach(async (authorName) => {
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
