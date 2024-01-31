import { useAtom } from "jotai";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text, ListItem, Button } from "react-native-ui-lib";
import { bookStore } from "../stores/bookStore";
import { FlashList } from "@shopify/flash-list";

const cardStyle = StyleSheet.create({
  card: {
    paddingLeft: 10, 
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  }
})

const listStyle = StyleSheet.create({
  list: {
    paddingBottom: 20
  }
})



function BookCard ({id, title, author}: Book) {
  return (
    <ListItem style={cardStyle.card} onPress={() => {}}>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{author}</Text>
    </ListItem>
  )
}


export default function BookList() {
  const [items] = useAtom(bookStore)

  const renderItem = ({item}: any) => {
    return (
      <View style={{borderTopWidth: 0.5}}>
        <BookCard id={item.id} title={item.title} author={item.author} />
      </View> 
    )
  }

  return (  
  <View style={{flex: 1}}>
    <FlashList 
      data={items} 
      renderItem={renderItem} 
      estimatedItemSize={100}
      keyExtractor={item => item.id.toString()}
      />
  </View>
  )
  
}