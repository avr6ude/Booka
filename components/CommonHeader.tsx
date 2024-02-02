import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-ui-lib'

export default function CommonHeader({ text }: { text: string }) {
  const colors = useTheme().colors

  const headerStyle = StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    headerText: {
      color: colors.text,
    },
  })

  return (
    <View style={headerStyle.topBar}>
      <Text text30BO style={headerStyle.headerText}>
        {text}
      </Text>
    </View>
  )
}
