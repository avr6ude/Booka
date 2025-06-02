import { atom, useAtom } from 'jotai'
import {
  Appearance,
  useColorScheme as useNativeColorScheme,
} from 'react-native'

const themeAtom = atom<'light' | 'dark' | null>(null)

export function useColorScheme() {
  const systemColorScheme = useNativeColorScheme()
  const [colorScheme, setColorScheme] = useAtom(themeAtom)

  const setTheme = (theme: 'light' | 'dark') => {
    setColorScheme(theme)
    Appearance.setColorScheme(theme)
  }

  return {
    colorScheme: colorScheme ?? systemColorScheme,
    setTheme,
  }
}
