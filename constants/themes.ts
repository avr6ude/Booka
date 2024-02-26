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
const lightColors = {
  $text: '#000',
  $background: '#fff',
  $tint: tintColorLight,
  $tabIconDefault: '#ccc',
  $tabIconSelected: tintColorLight,
}

const textSizes = {
  small: 12,
  body: 16,
  title: 24,
  header: 32,
}

const text = {
  small: {
    fontSize: textSizes.small,
    color: '$text',
  },
  body: {
    fontSize: textSizes.body,
    color: '$text',
  },
  title: {
    fontSize: textSizes.title,
    color: '$text',
  },
  header: {
    fontSize: textSizes.header,
    color: '$text',
  },
}

const theme = makeTheme({
  colors: darkColors,
  text,
  forms: text,
})

const themeLight = {
  ...theme,
  colors: lightColors,
}

type MyTheme = typeof theme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export { theme, themeLight }
