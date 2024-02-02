import { useTheme } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"
import { Button, ListItem, Text, View } from "react-native-ui-lib"

export default function BookCard ({title, authors, img = '', buttonLabel = '+', onPress, buttonOnPress}: {
  title: string,
  authors: string[],
  buttonLabel?: string,
  img?: string,
  onPress?: () => void,
  buttonOnPress?: () => void
}) {
  const colors = useTheme().colors
  
  const cardStyle = StyleSheet.create({
    card: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'space-between',
      height: '100%'
    },
    cardText: {
      flexDirection: 'column', 
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: '60%',
      rowGap: 5,
      paddingLeft: 10,
    },
    image: {
      width: 100,
      height: 150,
      borderRadius: 16,
    },
    bookHeader:{
      color: colors.text
    },
    bookAuthors:{
      color: colors.text
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    button: {
      height: 30,
      width: 30,
    }
  })
  return (

    <ListItem style={cardStyle.card} onPress={onPress}>
      {img && <Image source={{uri: img}} style={cardStyle.image}/>}
      <View style={cardStyle.cardText}>
        <Text text65 style={cardStyle.bookHeader}>{title}</Text>
        {authors && authors.length > 0 && <Text style={cardStyle.bookAuthors}>By {authors.join(', ')}</Text>}
      </View>
      <View style={cardStyle.buttonContainer}>
        <Button style={cardStyle.button}round size={'small'} label={buttonLabel} onPress={buttonOnPress}/>
      </View>
    </ListItem>
  )
}