import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image, Button } from 'react-native-ui-lib'
import { StyleSheet, ScrollView } from 'react-native'
import useAddBook from '@/helpers/useAddBook'
import Colors from '@/constants/Colors'
import { useTheme } from '@react-navigation/native'

export default function BookModal() {
  const params = useLocalSearchParams()
  const colors = useTheme().colors
  const { title, authors, img, pageCount, description } = params

  const addBook = useAddBook()

  const modalStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      rowGap: 10,
    },
    bookInfo: {
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: 5,
    },
    bookInfoText: {
      fontSize: 16,
      color: colors.text,
    },
    bookInfoTextHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    description: {
      maxHeight: 150,
      justifyContent: 'flex-end',
    },
    image: {
      width: 100,
      height: 150,
      borderRadius: 8,
      margin: 20,
    },
  })

  return (
    <View style={modalStyle.container}>
      <Image source={{ uri: img }} style={modalStyle.image} />
      <View style={modalStyle.bookInfo}>
        <Text style={modalStyle.bookInfoTextHeader}>{title}</Text>
        <Text style={modalStyle.bookInfoText}>{authors}</Text>
        {pageCount != '0' && (
          <Text style={modalStyle.bookInfoText}>{pageCount} pages</Text>
        )}
      </View>
      {description ? (
        <View style={modalStyle.description}>
          <ScrollView>
            <Text center style={modalStyle.bookInfoText}>
              {description}
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View style={modalStyle.description}>
          <Text center style={modalStyle.bookInfoText}>
            No description provided
          </Text>
        </View>
      )}
      <View style={{ justifyContent: 'flex-end' }}>
        <Button
          borderRadius={24}
          label="Add to library"
          onPress={addBook}
        ></Button>
      </View>
    </View>
  )
}
