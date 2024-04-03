import BookSearch from '@/components/BookSearch'
import CommonHeader from '@/components/CommonHeader'
import { SafeAreaView } from 'react-native'

export default function AddBook() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Booka" />
      <BookSearch />
    </SafeAreaView>
  )
}
