import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import CommonHeader from '@/components/CommonHeader'
import BookSearch from '@/components/BookSearch'

export default function AddBook() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Booka" />
      <BookSearch />
    </SafeAreaView>
  )
}
