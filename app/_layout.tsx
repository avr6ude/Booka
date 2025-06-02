import AppProvider from '@/components/AppProvider'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/helpers/useColorScheme'
import { AntDesign } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { ComponentProps, useEffect } from 'react'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '/',
}

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
  name: ComponentProps<typeof AntDesign>['name']
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
          tabBarActiveTintColor:
            Colors[colorScheme.colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="book" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="pluscircle" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="setting" color={color} />
            ),
          }}
        />
      </Tabs>
    </AppProvider>
  )
}
