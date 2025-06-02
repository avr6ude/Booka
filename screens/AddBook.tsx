import BookSearch from '@/components/BookSearch'
import CommonHeader from '@/components/CommonHeader'
import { View } from 'dripsy'

export default function AddBook() {
  return (
    <View style={{ flex: 1 }}>
      <CommonHeader text="Booka" />
      <BookSearch />
    </View>
  )
}
