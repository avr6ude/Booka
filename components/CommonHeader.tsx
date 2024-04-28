import { Text, View, useSx } from 'dripsy'

export default function CommonHeader({ text }: { text: string }) {
  const sx = useSx()

  const containerStyles = sx({
    bg: '$background',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  })

  return (
    <View sx={containerStyles}>
      <Text variant="header">{text}</Text>
    </View>
  )
}
