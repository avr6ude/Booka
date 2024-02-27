import { Ionicons } from '@expo/vector-icons'
import { View, Text, useSx } from 'dripsy'

export default function PageCounter({ count }: { count: number }) {
  const sx = useSx()

  const pagesStyle = sx({
    flexDirection: 'row',
    columnGap: 5,
  })
  const iconStyle = sx({
    color: '$text',
  })

  return (
    count > 0 && (
      <View sx={pagesStyle}>
        <Ionicons name="layers-outline" size={16} style={iconStyle} />
        <Text variant="small">{count} pages</Text>
      </View>
    )
  )
}
