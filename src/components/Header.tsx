import { StyleSheet } from 'react-native';
import {Button, ChipsInput, Text, TextField, View} from 'react-native-ui-lib';
import addBook from '../helpers/useAddBook';
import { useAtom } from 'jotai';
import { bookStore } from '../stores/bookStore';
import useAddBook from '../helpers/useAddBook';
import useRemoveBook from '../helpers/useRemoveBook';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/ButtonTypes';
import SearchBar from './SearchBar';

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
  }
})

const buttonBlock = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 2
  }
})

function HeaderButton({label, size, onPress}: {
  label: string
  size?: ButtonSizeProp
  onPress: () => void
}) {
  return (
    <Button
      style={buttonBlock.button}
      label={label}
      size={'xSmall'}
      onPress={onPress}
      round
    />
  )
}

export default function Header() {
  const [items] = useAtom(bookStore)
  const addBook = useAddBook()
  const removeBook = useRemoveBook()
  // const handleAddItem = () => {
  //   const newBook = {
  //     id: items.length + 1,
  //     title: "New Book",
  //     author: "New Author"
  //   }
  //   addBook(newBook)
  // }

  const handleRemoveItem = () => {
    removeBook()
  }

  return (
    <View style={headerStyle.header}>
      <View style={headerStyle.topBar}>
        <Text style={headerStyle.headerText}>booka</Text>
        <View style={buttonBlock.buttons}>
          {/* <HeaderButton label="+" onPress={handleAddItem}/> */}
          {/* <HeaderButton label="-" onPress={handleRemoveItem} /> */}
        </View>
      </View>
      {/* <SearchBar /> */}
    </View>
  )
}