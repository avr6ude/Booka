import { clearDatabase as clearDb } from '@/services/database'
import { useCallback } from 'react'

export default function useClearDatabase() {
  const clearDatabase = useCallback(async () => {
    try {
      await clearDb()
    } catch (error) {
      console.error('Error clearing database:', error)
    }
  }, [])

  return clearDatabase
}
