import Button from '@/components/Button'
import CommonHeader from '@/components/CommonHeader'
import { seed } from '@/components/seed'
import useClearDatabase from '@/helpers/useClearDatabase'
import { useColorScheme } from '@/helpers/useColorScheme'
import { Text, View } from 'dripsy'
import { SafeAreaView } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

export default function Settings() {
  const clearDatabase = useClearDatabase()
  const { colorScheme, setTheme } = useColorScheme()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Settings" />
      <View sx={{ flexDirection: 'col', gap: 16, padding: 4 }}>
        <Button title="Clear" onPress={() => clearDatabase()} />
        <View sx={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
          />
          <Text>Dark Mode</Text>
        </View>
        <Button title="Seed Database" onPress={seed} />
      </View>
    </SafeAreaView>
  )
}
