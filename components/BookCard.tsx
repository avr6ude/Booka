import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Button, ListItem, Text, View } from 'react-native-ui-lib'

interface BookProps {
  title: string
  authors: string[]
  buttonLabel?: string
  img?: string
  pageCount: number
  onPress?: () => void
  buttonOnPress?: () => void
}

export default function BookCard({
  title,
  authors,
  img = '',
  buttonLabel = '+',
  pageCount,
  onPress,
  buttonOnPress,
}: BookProps) {
  const colors = useTheme().colors

  const cardStyle = StyleSheet.create({
    card: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      marginBottom: 10,
    },
    item: {
      height: 'auto',
      width: '80%',
    },
    cardText: {
      flexDirection: 'column',
      rowGap: 5,
      paddingLeft: 10,
    },
    pages: {
      flexDirection: 'row',
      columnGap: 5,
    },
    pagesText: {
      color: 'lightgray',
      // fontWeight: 'bold'
    },
    image: {
      width: 100,
      height: 150,
      borderRadius: 8,
    },
    bookHeader: {
      color: colors.text,
    },
    bookAuthors: {
      color: colors.text,
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    button: {
      height: 30,
      width: 30,
    },
  })
  return (
    <View style={cardStyle.card}>
      <ListItem style={cardStyle.item} onPress={onPress}>
        {img && <Image source={{ uri: img }} style={cardStyle.image} />}
        <View style={cardStyle.cardText}>
          <Text text65 style={cardStyle.bookHeader}>
            {title}
          </Text>
          {authors && authors.length > 0 && (
            <Text style={cardStyle.bookAuthors}>By {authors.join(', ')}</Text>
          )}
          {pageCount > 0 && (
            <View style={cardStyle.pages}>
              <FontAwesome icon="layerGroup" color="white" />
              <Text style={cardStyle.pagesText}>{pageCount} pages</Text>
            </View>
          )}
        </View>
      </ListItem>
      <View style={cardStyle.buttonContainer}>
        <Button
          style={cardStyle.button}
          round
          size={'small'}
          label={buttonLabel}
          onPress={buttonOnPress}
        />
      </View>
    </View>
  )
}
