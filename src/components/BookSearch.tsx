import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, TextInput, StyleSheet  } from "react-native";
import { Text, ListItem, Button } from "react-native-ui-lib";
import truncateEnd from "../helpers/truncateEnd";
import Spacer from "./Spacer";
import { useAtom } from "jotai";
import { bookStore } from "../stores/bookStore";
import useAddBook from "../helpers/useAddBook";
import BookCard from "./BookCard";


const searchBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 10
  },
  input: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    marginRight: 10
  },
})

export default function BookSearch() {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = useAddBook();

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
        );
        const json = await res.json();
        setBooks(json.items || []);
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  const renderItem = ({item}: {item: Book}) => {
    const title = truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    return (
      <View>
        <BookCard title={title} authors={authors} onPress={() => addBook(item)} />
      </View> 
    )
  }

  return (
    <>
      <View style={searchBarStyle.container}>
        <TextInput
          style={searchBarStyle.input}
          placeholder="Search"
          value={query} 
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Button onPress={handleSearch} labelStyle={{color: "black"}}>
          <Text>Search</Text>
        </Button>
      </View>
      <View style={{height: '100%', flex: 1}}>
        <FlashList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          estimatedItemSize={200}
          ItemSeparatorComponent={() => <Spacer />}
        />
      </View>
    </>
  )
}
