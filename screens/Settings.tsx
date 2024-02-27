import { SafeAreaView } from 'react-native'
import CommonHeader from '@/components/CommonHeader'
import Button from '@/components/Button'
import useClearDatabase from '@/helpers/useClearDatabase'

export default function Settings() {
  const clearDatabase = useClearDatabase()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Settings" />
      <Button title="Clear" onPress={() => clearDatabase()} />
    </SafeAreaView>
  )
}
