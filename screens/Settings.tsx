import Button from '@/components/Button'
import CommonHeader from '@/components/CommonHeader'
import useClearDatabase from '@/helpers/useClearDatabase'
import { SafeAreaView } from 'react-native'

export default function Settings() {
  const clearDatabase = useClearDatabase()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="Settings" />
      <Button title="Clear" onPress={() => clearDatabase()} />
    </SafeAreaView>
  )
}
