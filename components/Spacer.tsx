import { View } from "react-native"

export default function Spacer({size = 0.5, color = 'black'}: {
    size?: number
    color?: string
  }) {
  return (
    <View
      style={{
        width: '100%',
        height: size,
        backgroundColor: color
      }}
    />
  )
  
}