import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-ui-lib'
import useAddBook from '../helpers/useAddBook'
import BookCard from './BookCard'
import { useTheme } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
export default function BookSearch() {
  const colors = useTheme().colors

  const searchBarStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 10,
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 24,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
    },
  })

  const [query, setQuery] = useState<string>('')
  const [books, setBooks] = useState<Book[]>([])

  const addBook = useAddBook()
  const uri = 'https://www.googleapis.com/books/v1/volumes?q='
  //const uri = 'http://localhost:3000/books?query='

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const res = await fetch(uri + encodeURIComponent(query))
        const json = await res.json()
        setBooks(json.items || [])
        console.log(books)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const renderItem = ({ item }: { item: Book }) => {
    const title = item.volumeInfo.title //truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    const pages = item.volumeInfo.pageCount
    return (
      <View>
        <BookCard
          title={title}
          authors={authors}
          pageCount={pages}
          img={img}
          buttonLabel="+"
          buttonOnPress={() => addBook(item)}
          onPress={() => {}}
        />
      </View>
    )
  }
  const searchIcon = () => (
    <AntDesign
      icon="setting"
      size={16}
      style={{ marginBottom: -3 }}
      color={colors.background}
    />
  )

  return (
    <>
      <Card style={searchBarStyle.container}>
        <TextInput
          style={searchBarStyle.input}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Button round onPress={handleSearch} iconSource={searchIcon} />
        <AntDesign icon="setting" size={28} color="white" />
      </Card>
      <View style={{ height: '100%', flex: 1 }}>
        <FlashList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </>
  )
}