import { Q } from '@nozbe/watermelondb'
import { useDatabase } from '@nozbe/watermelondb/hooks'

export default function useRemoveBook() {
  const database = useDatabase()
  const removeBook = async (bookId: string) => {
    await database
      .write(async () => {
        const book = await database.collections.get('books').find(bookId)
        if (book) {
          const authors = await database.collections
            .get('authors')
            .query(Q.where('book_id', bookId))
            .fetch()

          for (const author of authors) {
            await author.destroyPermanently()
          }
          await book.destroyPermanently()
        }
      })
      .catch((error) => console.error(error))
  }

  return removeBook
}
