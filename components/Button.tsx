import { Ionicons } from '@expo/vector-icons'
import { Text, useDripsyTheme, useSx } from 'dripsy'
import { ComponentProps } from 'react'
import AnimatedPressable from './AnimatedPressable'

interface ButtonProps {
  title?: string
  full?: boolean
  borderRadius?: number
  onPress: () => void
  color?: string
  round?: boolean
  iconName?: ComponentProps<typeof Ionicons>['name']
  iconColor?: string
  iconSize?: number
  type?: buttonType | string
}

enum buttonType {
  primary = 'primary',
  secondary = 'secondary',
}

export default function Button({
  title,
  full,
  onPress,
  color,
  round = false,
  iconName,
  borderRadius = 5,
  iconColor = 'white',
  iconSize = 24,
  type = buttonType.primary,
  ...rest
}: ButtonProps) {
  const sx = useSx()
  const { theme } = useDripsyTheme()

  const borderSize = round ? 9999 : borderRadius
  const paddingHorizontal = round ? 0 : 10
  const paddingVertical = round ? 0 : 5

  let buttonTypeKey: keyof typeof buttonType
  switch (type) {
    case buttonType.primary:
      buttonTypeKey = 'primary'
      break
    case buttonType.secondary:
      buttonTypeKey = 'secondary'
      break
    default:
      buttonTypeKey = 'primary'
  }

  const buttonThemeStyle = theme.button[buttonTypeKey]

  const backgroundColor = color || buttonThemeStyle.bg
  const height = round ? 36 : 'auto'
  const width = round ? 36 : 'auto'

  const buttonStyles = sx({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal,
    paddingVertical,
    height,
    width: full ? '100%' : width,
    borderRadius: borderSize,
    backgroundColor,
  })

  const buttonTextStyles = sx({
    color: 'white',
  })

  return (
    <AnimatedPressable onPress={onPress} style={buttonStyles} {...rest}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={{ marginRight: title ? 10 : 0 }}
        />
      )}
      {title && <Text sx={buttonTextStyles}>{title}</Text>}
    </AnimatedPressable>
  )
}
