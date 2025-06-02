import migrations from '@/drizzle/migrations'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { migrate } from 'drizzle-orm/expo-sqlite/migrator'
import { openDatabaseSync } from 'expo-sqlite'

const expo = openDatabaseSync('booka.db')
export const db = drizzle(expo)

migrate(db, migrations)
