import { Database, Q } from '@nozbe/watermelondb'
import { Observable } from 'rxjs'

export const isBookInDbObservable = (database: Database, data: any) => {
  return new Observable((subscriber) => {
    const checkBook = async () => {
      for (const bookId of data) {
        const idToCheck = typeof bookId === 'string' ? bookId : bookId.id

        const books = await database.collections
          .get('books')
          .query(Q.where('id', idToCheck))
          .fetch()

        if (books.length > 0) {
          subscriber.next(true)
          subscriber.complete()
          return
        }
      }

      subscriber.next(false)
      subscriber.complete()
    }
    checkBook().catch((error) => subscriber.error(error))
  })
}
