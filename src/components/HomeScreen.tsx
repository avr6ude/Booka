import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import Landing from "./Landing";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "react-native-ui-lib";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Landing />
    </SafeAreaView>
  )
}