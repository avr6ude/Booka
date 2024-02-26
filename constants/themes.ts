import { makeTheme } from 'dripsy'

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

const darkColors = {
  $text: '#fff',
  $background: '#000',
  $tint: tintColorDark,
  $tabIconDefault: '#ccc',
  $tabIconSelected: tintColorDark,
}
const textSizes = {
  small: 12,
  body: 16,
  title: 24,
  header: 32,
}

const theme = makeTheme({
  colors: darkColors,
  text: {
    body: {
      fontSize: textSizes.body,
      color: darkColors.$text,
    },
    header: {
      fontSize: textSizes.header,
      color: darkColors.$text,
    },
  },
  textSizes,
})

type AppTheme = typeof themeLight

declare module 'dripsy' {
  interface DisplayCustomTheme extends AppTheme {}
}

const lightColors: typeof darkColors = {
  $text: '#000',
  $background: '#fff',
  $tint: tintColorLight,
  $tabIconDefault: '#ccc',
  $tabIconSelected: tintColorLight,
}

const themeLight = makeTheme({
  ...theme,
  colors: lightColors,
})

export { theme, themeLight }
