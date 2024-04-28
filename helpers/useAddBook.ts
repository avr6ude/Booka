import Author from '@/models/Author'
import Book from '@/models/Book'
import { BookData } from '@/types/books'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
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
            book._raw = sanitizedRaw(
              {
                id: bookData.id,
                title: bookData.title,
                description: bookData.description,
                pages: bookData.pages,
                cover: bookData.cover,
                isbn10: bookData.isbn10,
                isbn13: bookData.isbn13,
              },
              booksCollection.schema
            )
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
