import { Text, View, useSx } from 'dripsy'

export default function CommonHeader({ text }: { text: string }) {
  const sx = useSx()

  return (
    <View
      sx={{
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'center',
      }}
    >
      <Text variant="header">{text}</Text>
    </View>
  )
}
