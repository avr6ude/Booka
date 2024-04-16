import { theme, themeLight } from '@/constants/themes'
import Author from '@/models/Author'
import Book from '@/models/Book'
import IndustryIdentifier from '@/models/IndustryIdentifier'
import booka from '@/models/schema'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Database } from '@nozbe/watermelondb'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DripsyProvider } from 'dripsy'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { changeBarColors } from 'react-native-immersive-bars'

export default function AppProvider({ children }: any) {
  const colorMode = useColorScheme()
  const themeSelector = colorMode === 'dark' ? theme : themeLight
  const navigationThemeSelector =
    colorMode === 'dark' ? DarkTheme : DefaultTheme

  const adapter = new SQLiteAdapter({
    dbName: 'booka',
    schema: booka,
  })

  const database = new Database({
    adapter,
    modelClasses: [Book, Author, IndustryIdentifier],
  })

  const queryClient = new QueryClient()

  useEffect(() => {
    changeBarColors(true, '#50000000', 'transparent')
  }, [])

  return (
    <DripsyProvider theme={themeSelector}>
      <DatabaseProvider database={database}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider value={navigationThemeSelector}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </DatabaseProvider>
    </DripsyProvider>
  )
}
