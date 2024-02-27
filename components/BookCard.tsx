import Ionicons from '@expo/vector-icons/Ionicons'
import {
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native'
import { useCallback, useMemo, useRef } from 'react'
import { Text, View, useSx, Pressable } from 'dripsy'
import BookModal from './BookModal'
import Button from './Button'
import ThumbnailImage from './ThumbnailImage'
import Animated from 'react-native-reanimated'
import Author from '@/models/Author'
import PageCounter from './PageCounter'

export interface BookProps {
  title: string
  authors: Author[] | string[]
  description: string
  thumbnail: string
  buttonLabel?: string
  pageCount: number
  onPress?: () => void
  buttonOnPress?: () => void
}

export default function BookCard({
  title,
  authors,
  thumbnail,
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
      thumbnail={thumbnail}
      pageCount={pageCount}
    />
  )

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  function CustomBackground({ style }: BottomSheetBackgroundProps) {
    const containerAnimatedStyle = sx({ backgroundColor: '$background' })
    const containerStyle = useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle]
    )
    return <Animated.View pointerEvents="none" style={containerStyle} />
  }

  return (
    <View sx={container}>
      <Pressable sx={contentStyles} onPress={handlePresentModalPress}>
        {thumbnail && (
          <ThumbnailImage
            src={thumbnail}
            style={{
              marginRight: 10,
            }}
          />
        )}
        <View sx={textContainer}>
          <Text variant="bookTitle">{title}</Text>
          {authors && authors.length > 0 ? (
            <Text>By {authors.join(', ')}</Text>
          ) : (
            <Text>No authors data</Text>
          )}
          <PageCounter count={pageCount} />
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
        backgroundComponent={CustomBackground}
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
