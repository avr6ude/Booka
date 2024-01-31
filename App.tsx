import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/components/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator sceneContainerStyle={{flex: 1}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Settings" component={HomeScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
