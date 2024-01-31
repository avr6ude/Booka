import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

const headerStyle = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
  }
})

export default function CommonHeader({text}: {text: string}) {
  return (
    <View style={headerStyle.header}>
      <View style={headerStyle.topBar}>
        <Text style={headerStyle.headerText}>{text}</Text>
      </View>
    </View>
  )
}