import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, TextInput, StyleSheet  } from "react-native";
import { Text, ListItem, Button, Image, Card } from "react-native-ui-lib";
import truncateEnd from "../helpers/truncateEnd";
import Spacer from "./Spacer";
import { useAtom } from "jotai";
import { bookStore } from "../stores/bookStore";
import useAddBook from "../helpers/useAddBook";
import BookCard from "./BookCard";
import { useTheme } from "@react-navigation/native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function BookSearch() {
  const colors = useTheme().colors
  
  const searchBarStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 10,
      marginVertical: 20,
      marginHorizontal: 10,
      borderRadius: 24,
      backgroundColor: colors.background
    },
    input: {
      flex: 1,  
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 20,
      padding: 10,
      marginRight: 10
    },
  })
  
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
    const title = item.volumeInfo.title //truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    return (
      <View>
        <BookCard title={title} authors={authors} img={img} buttonLabel="+" buttonOnPress={() => addBook(item)} onPress={() => {}}/>
      </View> 
    )
  }
  const searchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color={colors.background}/>

  return (
    <>
      <Card style={searchBarStyle.container}>
        <TextInput
          style={searchBarStyle.input}
          placeholder="Search"
          value={query} 
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          />
          <Button round onPress={handleSearch} iconSource={searchIcon}/>
      </Card>
      <View style={{height: '100%', flex: 1}}>
        <FlashList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          estimatedItemSize={200}
        />
      </View>
    </>
  )
}
