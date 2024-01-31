import { SafeAreaView, StatusBar, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native-ui-lib";
import CommonHeader from "../components/CommonHeader";
import { FlashList } from "@shopify/flash-list";
import { useAtom } from "jotai";
import { bookStore } from "../stores/bookStore";
import truncateEnd from "../helpers/truncateEnd";
import BookCard from "../components/BookCard";
import useRemoveBook from "../helpers/useRemoveBook";

export default function SavedBooks() {

  const [item] = useAtom(bookStore)
  const removeBook = useRemoveBook();
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const renderItem = ({item}: {item: Book}) => {
    const title = truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    return (
      <View>
        <BookCard title={title} authors={authors} buttonLabel="-" onPress={() => removeBook(item)}/>
      </View> 
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CommonHeader text="My books" />
      <View style={{height: '100%'}}>
        <FlashList
          data={item}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  )
}