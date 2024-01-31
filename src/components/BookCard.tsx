import { StyleSheet } from "react-native"
import { Button, ListItem, Text, View } from "react-native-ui-lib"

const cardStyle = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    height: '100%',
  },
  cardText: {
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: '80%'
  },
  button: {
    padding: 5,
    width: 40,
    height: 40,
  }
})

export default function BookCard ({title, authors, buttonLabel = "+", onPress}: {
  title: string,
  authors: string[],
  buttonLabel?: string,
  onPress?: () => void
}) {
  return (
    <ListItem style={cardStyle.card} onPress={() => {}}>
      <View style={cardStyle.cardText}>
        <Text>{title}</Text>
        {authors && authors.length > 0 && <Text>By {authors.join(', ')}</Text>}
      </View>
      <Button style={cardStyle.button} round label={buttonLabel} onPress={onPress}/>
    </ListItem>
  )
}