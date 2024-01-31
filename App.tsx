import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedBooks from './src/screens/SavedBooks';

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator sceneContainerStyle={{flex: 1}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="My books" component={SavedBooks} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
