import { View } from 'dripsy'
import React from 'react'
import { Button } from 'react-native'
import { seed } from './seed'

export default function SeedScreen() {
  return (
    <View>
      <Button title="Seed Database" onPress={seed} />
    </View>
  )
}
