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

const fonts = {
  body: {
    fontSize: textSizes.body,
    color: darkColors.$text,
  },
  header: {
    fontSize: textSizes.header,
    color: darkColors.$text,
  },
}

const theme = makeTheme({
  colors: darkColors,
  text: fonts,
  forms: fonts,
})

type MyTheme = typeof theme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export default theme
