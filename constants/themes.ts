import { makeTheme } from 'dripsy'

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

const buttonBg = '#6d3178'

const darkColors = {
  $text: '#fff',
  $background: '#000',
  $tint: tintColorDark,
  $tabIconDefault: '#ccc',
  $tabIconSelected: tintColorDark,
  $button: buttonBg,
}
const lightColors = {
  $text: '#000',
  $background: '#fff',
  $tint: tintColorLight,
  $tabIconDefault: '#ccc',
  $tabIconSelected: tintColorLight,
  $button: buttonBg,
}

const textSizes = {
  small: 12,
  body: 16,
  bookTitle: 20,
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
    fontWeight: 'bold',
  },
  header: {
    fontSize: textSizes.header,
    color: '$text',
    fontWeight: 'bold',
  },
  bold: {
    fontSize: textSizes.body,
    fontWeight: 'bold',
  },
  bookTitle: {
    fontSize: textSizes.bookTitle,
    fontWeight: 'bold',
    color: '$text',
  },
}

const button = {
  primary: {
    bg: '$button',
    color: '$text',
  },
  secondary: {
    bg: '$button',
    color: '$text',
  },
}

const theme = makeTheme({
  colors: darkColors,
  text,
  forms: text,
  button,
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
