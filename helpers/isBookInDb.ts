import { IndustryIdentifierData } from '@/types/books'
import { Q, Database } from '@nozbe/watermelondb'
import { Observable } from 'rxjs'

export const isBookInDbObservable = (
  database: Database,
  data: IndustryIdentifierData[]
) => {
  return new Observable((subscriber) => {
    const checkBook = async () => {
      for (const identifierData of data) {
        const { type, identifier } = identifierData

        const identifiers = await database.collections
          .get('industry_identifiers')
          .query(Q.where('type', type), Q.where('identifier', identifier))
          .fetch()

        if (identifiers.length > 0) {
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
