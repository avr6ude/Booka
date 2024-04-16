import Author from '@/models/Author'
import Book from '@/models/Book'
import IndustryIdentifier from '@/models/IndustryIdentifier'
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
          const industryIdentifiersCollection =
            database.collections.get<IndustryIdentifier>('industry_identifiers')
          const book = await booksCollection.create((book) => {
            book.title = bookData.title
            book.description = bookData.description
            book.pageCount = bookData.pages
            book.cover = bookData.cover
          })

          bookData.authors?.forEach(async (authorName: string) => {
            await authorsCollection.create((author) => {
              author.book_id = book.id
              author.name = authorName
            })
          })

          //const identifierData = bookData.volumeInfo.industryIdentifiers

          // if (identifierData && Array.isArray(identifierData)) {
          //   for (const idData of identifierData) {
          //     await industryIdentifiersCollection.create(
          //       (industryIdentifier) => {
          //         industryIdentifier.book_id = book.id
          //         industryIdentifier.type = idData.type
          //         if (industryIdentifier.type === 'OTHER') {
          //           const match = idData.identifier.match(/(\D+?):(\d+)/)
          //           if (match) {
          //             industryIdentifier.type = match[1].trim()
          //             industryIdentifier.identifier = match[2]
          //           }
          //         } else {
          //           industryIdentifier.identifier = idData.identifier
          //         }
          //       }
          //     )
          //   }
          // }
        })
      },
    })
    return () => subscription.unsubscribe()
  }, [database, bookAddSubject])

  return { addBook }
}
