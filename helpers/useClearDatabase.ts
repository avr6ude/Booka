import { useCallback } from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'

export default function useClearDatabase() {
  const database = useDatabase()
  const clearDatabase = useCallback(async () => {
    const allTables = ['books', 'authors', 'industry_identifiers']
    for (const tableName of allTables) {
      await database.write(async () => {
        const collection = database.collections.get(tableName)
        const allRecords = await collection.query().fetch()

        const batchSize = 100
        for (let i = 0; i < allRecords.length; i += batchSize) {
          const batch = allRecords.slice(i, i + batchSize)
          await database.batch(
            ...batch.map((record) => record.prepareDestroyPermanently())
          )
        }
      })
    }
  }, [])

  return clearDatabase
}
