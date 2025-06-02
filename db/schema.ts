import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const books = sqliteTable('books', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  pageCount: integer('page_count'),
  cover: text('cover'),
  isbn10: text('isbn10'),
  isbn13: text('isbn13'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const authors = sqliteTable('authors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookId: text('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
})

export type Book = typeof books.$inferSelect
export type NewBook = typeof books.$inferInsert
export type Author = typeof authors.$inferSelect
export type NewAuthor = typeof authors.$inferInsert
