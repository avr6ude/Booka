import React from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Pressable, useSx } from 'dripsy'

const CustomPressable = ({
  children,
  onPress,
  style,
  ...props
}: {
  children: React.ReactNode
  onPress: () => void
  style?: any
}) => {
  const sx = useSx()
  const opacity = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    opacity.value = withTiming(0.5, { duration: 200 })
  }

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: 200 })
  }

  const combinedStyles = [sx(style), animatedStyle]

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      <Animated.View style={combinedStyles}>{children}</Animated.View>
    </Pressable>
  )
}

export default CustomPressable
