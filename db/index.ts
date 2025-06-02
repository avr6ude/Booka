import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

const expo = openDatabaseSync('booka.db')
export const db = drizzle(expo)
