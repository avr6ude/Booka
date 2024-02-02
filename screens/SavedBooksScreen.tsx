import { SafeAreaView, View } from 'react-native'
import CommonHeader from '../components/CommonHeader'
import { FlashList } from '@shopify/flash-list'
import { useAtom } from 'jotai'
import { bookStore } from '../stores/bookStore'
import truncateEnd from '../helpers/truncateEnd'
import BookCard from '../components/BookCard'
import useRemoveBook from '../helpers/useRemoveBook'

export default function SavedBooksScreen() {
  const [item] = useAtom(bookStore)
  const removeBook = useRemoveBook()

  const renderItem = ({ item }: { item: Book }) => {
    const title = truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    const pages = item.volumeInfo.pageCount
    return (
      <View>
        <BookCard
          title={title}
          pageCount={pages}
          img={img}
          authors={authors}
          buttonLabel="-"
          buttonOnPress={() => removeBook(item)}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="My books" />
      <View style={{ height: '100%' }}>
        <FlashList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item: Book) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </SafeAreaView>
  )
}
