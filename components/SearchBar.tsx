import { TextInput, useSx, View } from 'dripsy'
import Button from './Button'

type SearchBarProps = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const sx = useSx()

  const container = sx({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 32,
    backgroundColor: '$background',
    shadowColor: '$text',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,
  })

  const searchBarStyles = sx({
    flex: 1,
    backgroundColor: '$background',
    color: '$text',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  })

  return (
    <View sx={container}>
      <TextInput
        style={searchBarStyles}
        placeholder="Search"
        onChangeText={onSearch}
        autoFocus
      />
      <Button
        round
        onPress={() => onSearch('')}
        iconName="search"
        iconSize={20}
      />
    </View>
  )
}
