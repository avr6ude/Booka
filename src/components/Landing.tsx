import { Text, View } from "react-native";
import Header from "./Header";
import BookList from "./BookList";

export default function Landing() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <BookList />
    </View>
  )
}