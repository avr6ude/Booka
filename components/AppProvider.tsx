import {
  navigationThemeDark,
  navigationThemeLight,
  theme,
  themeLight,
} from '@/constants/themes'
import { expo } from '@/db'
import { initDatabase } from '@/services/database'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DripsyProvider } from 'dripsy'
import { useSQLiteDevTools } from 'expo-sqlite-devtools'
import { ReactNode, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { changeBarColors } from 'react-native-immersive-bars'

export default function AppProvider({
  children,
}: {
  children: ReactNode
}) {
  const colorMode = useColorScheme()
  const themeSelector = colorMode === 'dark' ? theme : themeLight
  const navigationThemeSelector =
    colorMode === 'dark' ? navigationThemeDark : navigationThemeLight

  const queryClient = new QueryClient()
  useSQLiteDevTools(expo)

  useEffect(() => {
    changeBarColors(true, '#50000000', 'transparent')
    initDatabase().catch(console.error)
  }, [])

  return (
    <DripsyProvider theme={themeSelector}>
      <ThemeProvider value={navigationThemeSelector}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </DripsyProvider>
  )
}
