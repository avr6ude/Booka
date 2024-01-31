import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, TextInput, StyleSheet  } from "react-native";
import { Text, ListItem, Button } from "react-native-ui-lib";

const cardStyle = StyleSheet.create({
  card: {
    paddingLeft: 10, 
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  }
})

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
  button: {
    padding: 1,
  }
})

export default function BookSearch() {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

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

  function BookCard ({title, authors}: {
    title: string,
    authors: string[]
  }) {
    return (
      <ListItem style={cardStyle.card} onPress={() => {}}>
        <Text>{title}</Text>
        {authors && authors.length > 0 && <Text>By {authors.join(', ')}</Text>}
      </ListItem>
    )
  }

  const renderItem = ({item}: {item: Book}) => {
    return (
      <View style={{borderTopWidth: 0.5}}>
        <BookCard title={item.volumeInfo.title} authors={item.volumeInfo.authors} />
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
        <Button style={searchBarStyle.button} onPress={handleSearch} labelStyle={{color: "black"}}>
          <Text>Search</Text>
        </Button>
      </View>
      <View style={{height: '100%', flex: 1}}>
        <FlashList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  )
}
