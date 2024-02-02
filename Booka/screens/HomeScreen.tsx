import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import Landing from "../components/Landing";
import { Colors } from "react-native-ui-lib";

export default function HomeScreen() {

  return (
    <SafeAreaView style={{flex: 1}}>
      <Landing/>
    </SafeAreaView>
  )
}