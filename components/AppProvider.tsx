import { database } from '@/app/_layout'
import theme from '@/constants/themes'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import { DripsyProvider } from 'dripsy'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function AppProvider({ children }: any) {
  const colorMode = useColorScheme()

  return (
    <DripsyProvider theme={theme}>
      <DatabaseProvider database={database}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </GestureHandlerRootView>
      </DatabaseProvider>
    </DripsyProvider>
  )
}
