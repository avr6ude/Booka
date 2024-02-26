import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { View, TextInput } from 'dripsy'
import { StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-ui-lib'
import useAddBook from '../helpers/useAddBook'
import BookCard from './BookCard'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
export default function BookSearch() {
  const colors = useTheme().colors

  const searchBarStyles = {}

  const searchBarStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 10,
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 24,
      backgroundColor: '$background',
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
  const [books, setBooks] = useState<BookData[]>([])
  const [added, setAdded] = useState<boolean>(false)

  const addBook = useAddBook()

  const handleAddBook = (item: BookData) => {
    addBook(item)
    setAdded(true)
  }

  const uri = 'https://www.googleapis.com/books/v1/volumes?q='

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const res = await fetch(uri + encodeURIComponent(query))
        const json = await res.json()
        setBooks(json.items || [])
      } catch (e) {
        console.error(e)
      }
    }
  }
  function SearchIcon() {
    return <Ionicons name="search" size={16} color={'white'} />
  }

  function SearchBar() {
    return (
      <View sx={searchBarStyles}>
        <TextInput
          style={searchBarStyle.input}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Button
          round
          onPress={handleSearch}
          iconSource={() => <SearchIcon />}
        />
      </View>
    )
  }
  const renderItem = ({ item }: { item: BookData }) => {
    const title = item.volumeInfo.title //truncateEnd(item.volumeInfo.title, 50)
    const authors = item.volumeInfo.authors
    const img = item.volumeInfo.imageLinks?.thumbnail
    const pages = item.volumeInfo.pageCount
    const description = item.volumeInfo.description

    return (
      <View>
        <BookCard
          title={title}
          authors={authors}
          pageCount={pages}
          img={img}
          buttonLabel={added ? '-' : '+'}
          description={description}
          buttonOnPress={() => handleAddBook(item)}
          onPress={() => {}}
        />
      </View>
    )
  }
  //fix L104 to use as a component <SearchBar />}
  return (
    <>
      {SearchBar()}
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
