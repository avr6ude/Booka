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
import booka from '@/models/schema'
import { Database } from '@nozbe/watermelondb'
import Author from '@/models/Author'
import Book from '@/models/Book'
import IndustryIdentifier from '@/models/IndustryIdentifier'
import AppProvider from '@/components/AppProvider'
export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '/',
}

export const adapter = new SQLiteAdapter({
  dbName: 'booka',
  schema: booka,
})

export const database = new Database({
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

export function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
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
    </AppProvider>
  )
}
