import { View } from "react-native";
import BookSearch from "./BookSearch";
import CommonHeader from "./CommonHeader";

export default function Landing() {
  return (
    <View style={{flex: 1}}>
      <CommonHeader text="Booka" />
      <BookSearch />
    </View>
  )
}