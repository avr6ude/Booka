import Author from '@/models/Author'
import Book from '@/models/Book'
import { useDatabase } from '@nozbe/watermelondb/hooks'

interface StrippedBookData {
  title: string
  authors: string[]
  description: string
  industryIdentifiers: {
    type: string
    identifier: string
  }
  pageCount: number
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
  }
}

export default function useAddBook() {
  const database = useDatabase()

  const addBook = async (bookData: BookData) => {
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
      for (const authorName of bookData.volumeInfo.authors) {
        await authorsCollection.create((author) => {
          author.book_id = book.id
          author.name = authorName
        })
      }
    })
  }

  return addBook
}
