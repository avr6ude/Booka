import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useColorScheme } from '@/helpers/useColorScheme'
import Colors from '@/constants/Colors'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { AntDesign } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import booka from '@/model/schema'
import { Database } from '@nozbe/watermelondb'
import Author from '@/model/Author'
import Book from '@/model/Book'
import IndustryIdentifier from '@/model/IndustryIdentifier'
export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '/',
}

const adapter = new SQLiteAdapter({
  dbName: 'booka',
  schema: booka,
})

const database = new Database({
  adapter,
  modelClasses: [Book, Author, IndustryIdentifier],
})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name']
  color: string
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DatabaseProvider database={database}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
              }}
            >
              <Tabs.Screen
                name="savedBooks"
                options={{
                  title: 'Saved Books',
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="book" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="add"
                options={{
                  title: 'Add',
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="pluscircle" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="settings"
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="setting" color={color} />
                  ),
                }}
              />
            </Tabs>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </DatabaseProvider>
    </ThemeProvider>
  )
}
