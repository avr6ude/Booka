import { theme, themeLight } from '@/constants/themes'
import { initDatabase } from '@/services/database'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DripsyProvider } from 'dripsy'
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
  // const navigationThemeSelector =
  //   colorMode === 'dark' ? navigationThemeDark : navigationThemeLight

  const queryClient = new QueryClient()

  useEffect(() => {
    changeBarColors(true, '#50000000', 'transparent')
    initDatabase().catch(console.error)
  }, [])

  return (
    <DripsyProvider theme={themeSelector}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </DripsyProvider>
  )
}
