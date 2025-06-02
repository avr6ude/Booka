import { db } from '@/db'
import { type NewAuthor, type NewBook, authors, books } from '@/db/schema'
import { BookData } from '@/types/books'
import { eq } from 'drizzle-orm'

export const initDatabase = async () => {
  // Drizzle will automatically create tables based on the schema
  await Promise.resolve()
}

export const addBook = async (book: BookData) => {
  await db.transaction(async (tx) => {
    const newBook: NewBook = {
      id: book.id,
      title: book.title,
      description: book.description,
      pageCount: book.pages,
      cover: book.cover,
      isbn10: book.isbn10,
      isbn13: book.isbn13,
    }
    await tx.insert(books).values(newBook)

    if (book.authors?.length) {
      const newAuthors: NewAuthor[] = book.authors.map((name) => ({
        bookId: book.id,
        name,
      }))
      await tx.insert(authors).values(newAuthors)
    }
  })
}

export const removeBook = async (bookId: string) => {
  await db.delete(books).where(eq(books.id, bookId))
}

type BookWithAuthors = {
  id: string
  title: string
  description: string
  pageCount: number
  cover: string
  isbn10: string
  isbn13: string
  authors: string[]
}

type BookRow = {
  id: string
  title: string
  description: string
  pageCount: number
  cover: string
  isbn10: string
  isbn13: string
  authors: string
}

export const getBooks = async (): Promise<BookWithAuthors[]> => {
  const result = await db
    .select({
      id: books.id,
      title: books.title,
      description: books.description,
      pageCount: books.pageCount,
      cover: books.cover,
      isbn10: books.isbn10,
      isbn13: books.isbn13,
      authors: books.id,
    })
    .from(books)
    .leftJoin(authors, eq(books.id, authors.bookId))

  const booksMap = new Map<string, BookWithAuthors>()

  for (const row of result as BookRow[]) {
    const book = booksMap.get(row.id) || {
      id: row.id,
      title: row.title,
      description: row.description,
      pageCount: row.pageCount,
      cover: row.cover,
      isbn10: row.isbn10,
      isbn13: row.isbn13,
      authors: [],
    }

    if (row.authors) {
      const author = await db
        .select({ name: authors.name })
        .from(authors)
        .where(eq(authors.bookId, row.id))
        .get()
      if (author) {
        book.authors.push(author.name as string)
      }
    }

    booksMap.set(row.id, book)
  }

  return Array.from(booksMap.values())
}

export const clearDatabase = async () => {
  await db.transaction(async (tx) => {
    await tx.delete(authors)
    await tx.delete(books)
  })
}

export const isBookInDb = async (bookId: string) => {
  const book = await db
    .select({ id: books.id })
    .from(books)
    .where(eq(books.id, bookId))
    .get()
  return !!book
}
