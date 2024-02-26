import { Text, View } from 'dripsy'

export default function CommonHeader({ text }: { text: string }) {
  const containerStyles = {
    backgroundColor: '$background',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  }

  return (
    <View sx={containerStyles}>
      <Text variant="header">{text}</Text>
    </View>
  )
}
