import { ScrollView, View, Text, Image, useSx } from 'dripsy'
import { StyleSheet } from 'react-native'
import useAddBook from '@/helpers/useAddBook'
import { useTheme } from '@react-navigation/native'
import Book from '@/models/Book'
import Button from './Button'
import { BookProps } from './BookCard'
import ThumbnailImage from './ThumbnailImage'
import PageCounter from './PageCounter'

export default function BookModal({
  title,
  description,
  authors,
  thumbnail,
  pageCount,
}: BookProps) {
  const addBook = useAddBook()
  const sx = useSx()

  const container = sx({
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: '95%',
    alignItems: 'center',
    paddingHorizontal: 10,
    rowGap: 20,
  })

  const bookInfoStyle = sx({
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  })

  const descriptionTextStyle = sx({
    flex: 1,
    textAlign: 'justify',
  })

  const buttonStyle = sx({
    justifyContent: 'flex-end',
    width: '100%',
  })

  return (
    <View sx={container}>
      {thumbnail && <ThumbnailImage src={thumbnail} />}
      <View sx={bookInfoStyle}>
        <Text sx={{ textAlign: 'center' }} variant="title">
          {title}
        </Text>
        {authors && authors.length > 0 ? (
          <Text>By {authors.join(', ')}</Text>
        ) : (
          <Text>No authors data</Text>
        )}
        <PageCounter count={pageCount} />
      </View>
      <ScrollView>
        {description ? (
          <Text sx={descriptionTextStyle}>{description}</Text>
        ) : (
          <Text>No description provided</Text>
        )}
      </ScrollView>
      <View sx={buttonStyle}>
        <Button
          full
          borderRadius={24}
          title="Add to library"
          onPress={() => addBook}
        />
      </View>
    </View>
  )
}
