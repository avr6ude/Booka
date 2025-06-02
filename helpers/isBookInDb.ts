import { isBookInDb as checkBookInDb } from '@/services/database'
import { Observable } from 'rxjs'

export const isBookInDbObservable = (data: string[]) => {
  return new Observable<boolean>((subscriber) => {
    const checkBook = async () => {
      for (const bookId of data) {
        const exists = await checkBookInDb(bookId)
        if (exists) {
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
