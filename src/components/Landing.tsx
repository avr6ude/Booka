import { View } from "react-native";
import Header from "./Header";
import BookSearch from "./BookSearch";

export default function Landing() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <BookSearch />
    </View>
  )
}