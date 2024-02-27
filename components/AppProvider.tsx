import { database } from '@/app/_layout'
import { theme, themeLight } from '@/constants/themes'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from '@react-navigation/native'
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

  useEffect(() => {
    changeBarColors(true, '#50000000', 'transparent')
  }, [])

  return (
    <DripsyProvider theme={themeSelector}>
      <DatabaseProvider database={database}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider value={navigationThemeSelector}>
              {children}
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </DatabaseProvider>
    </DripsyProvider>
  )
}
