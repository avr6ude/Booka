import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native'
import { useCallback, useMemo, useRef } from 'react'
import { Text, View, useSx, Image, Pressable } from 'dripsy'
import BookModal from './BookModal'
import Button from './Button'

export interface BookProps {
  title: string
  authors?: string[]
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
  const sx = useSx()

  const container = sx({
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  })

  const contentStyles = sx({
    height: 'auto',
    width: '50%',
    flexDirection: 'row',
  })

  const buttonContainer = sx({
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  })

  const textContainer = sx({
    flexDirection: 'column',
    alignItems: 'start',
    rowGap: 5,
  })

  const imageStyle = sx({
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  })

  const pagesStyle = sx({
    flexDirection: 'row',
    columnGap: 5,
  })

  const shadowStyle = sx({
    backgroundColor: 'black',
    borderRadius: 32,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.5,
    shadowRadius: 24.0,
    elevation: 16,
  })
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const renderContent = () => (
    <BookModal
      title={title}
      description={description}
      authors={authors}
      img={img}
      pageCount={pageCount}
    />
  )

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  return (
    <View sx={container}>
      <Pressable sx={contentStyles} onPress={handlePresentModalPress}>
        {img && <Image source={{ uri: img }} sx={imageStyle} />}
        <View sx={textContainer}>
          <Text variant="bookTitle">{title}</Text>
          {authors && authors.length > 0 && (
            <Text>By {authors.join(', ')}</Text>
          )}
          {pageCount > 0 && (
            <View sx={pagesStyle}>
              <Ionicons name="layers-outline" size={16} color={colors.text} />
              <Text variant="small">{pageCount} pages</Text>
            </View>
          )}
        </View>
      </Pressable>
      <View sx={buttonContainer}>
        <Button
          type="secondary"
          round
          title={buttonLabel}
          onPress={() => buttonOnPress}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        style={shadowStyle}
        backgroundStyle={{
          backgroundColor: 'black',
        }}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
          }}
        >
          {renderContent()}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}
