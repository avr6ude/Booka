import { DefaultTheme, NavigationContainer, DarkTheme, useTheme } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedBooks from './src/screens/SavedBooks';
import { Text, View, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faPlus, faGear } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const Tab = createBottomTabNavigator()
  const theme = useColorScheme()
  const colors = useTheme().colors
  const isDarkMode = theme === 'dark'
  const myBooksIcon = () => <FontAwesomeIcon icon={faBook} size={24} color={colors.background}/>
  const plusIcon = () => <FontAwesomeIcon icon={faPlus} size={24} color={colors.background}/>
  const settingsIcon = () => <FontAwesomeIcon icon={faGear} size={24} color={colors.background}/>

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator sceneContainerStyle={{flex: 1}}>
        <Tab.Screen name="My books" component={SavedBooks} options={{headerShown: false, tabBarIcon: myBooksIcon, tabBarShowLabel: false }}/>
        <Tab.Screen name="Add" component={HomeScreen} options={{headerShown: false, tabBarIcon: plusIcon,  tabBarShowLabel: false}}/>
        <Tab.Screen name="Settings" component={SavedBooks} options={{headerShown: false, tabBarIcon: settingsIcon, tabBarShowLabel: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
