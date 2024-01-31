import { StyleSheet } from 'react-native';
import {Button, Text, View} from 'react-native-ui-lib';
import addBook from '../helpers/useAddBook';
import { useAtom } from 'jotai';
import { bookStore } from '../stores/bookStore';
import useAddBook from '../helpers/useAddBook';
import useRemoveBook from '../helpers/useRemoveBook';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/ButtonTypes';

const headerStyle = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
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
    />
  )
}

export default function Header() {
  const [items] = useAtom(bookStore)
  const addBook = useAddBook()
  const removeBook = useRemoveBook()
  const handleAddItem = () => {
    const newBook = {
      id: items.length + 1,
      title: "New Book",
      author: "New Author"
    }
    addBook(newBook)
  }

  const handleRemoveItem = () => {
    removeBook()
  }
  return (
    <View style={headerStyle.header}>
      <Text style={headerStyle.headerText}>booka</Text>
      <View style={buttonBlock.buttons}>
        <HeaderButton label="Add" onPress={handleAddItem}/>
        <HeaderButton label="Remove" onPress={handleRemoveItem} />
      </View>
    </View>
  )
}