import Ionicons from '@expo/vector-icons/Ionicons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native'
import { useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Button, ListItem, Text, View } from 'react-native-ui-lib'
import BookModal from './Modal'

interface BookProps {
  title: string
  authors: string[]
  buttonLabel?: string
  img?: string
  pageCount: number
  description: string
  onPress?: () => void
  buttonOnPress?: () => void
}

export default function BookCard({
  title,
  authors,
  img = '',
  buttonLabel = '+',
  pageCount,
  description,
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // Function to open the bottom sheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  // Bottom sheet content
  const renderContent = () => (
    <BookModal
      title={title}
      description={description}
      authors={authors}
      thumbnail={img}
      pageCount={pageCount}
    />
  )

  // Bottom sheet modal configuration
  const snapPoints = useMemo(() => ['25%', '85%'], [])

  return (
    <View style={cardStyle.card}>
      <ListItem style={cardStyle.item} onPress={handlePresentModalPress}>
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
              <Ionicons name="layers-outline" size={16} color={colors.text} />
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
      >
        {renderContent()}
      </BottomSheetModal>
    </View>
  )
}
