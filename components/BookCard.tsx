import { theme } from '@/constants/themes'
import Author from '@/models/Author'
import { Ionicons } from '@expo/vector-icons'
import {
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Text, View, useSx } from 'dripsy'
import { ComponentProps, useCallback, useMemo, useRef } from 'react'
import Animated from 'react-native-reanimated'
import truncateEnd from '../helpers/truncateEnd'
import AnimatedPressable from './AnimatedPressable'
import BookModal from './BookModal'
import Button from './Button'
import PageCounter from './PageCounter'
import ThumbnailImage from './ThumbnailImage'

export interface BookProps {
  title: string
  authors: Author[] | string[]
  description: string
  thumbnail: string
  pageCount: number
  onPress?: () => void
  buttonTitle?: string
  buttonIcon?: ComponentProps<typeof Ionicons>['name']
  buttonOnPress?: () => void
}

export default function BookCard({
  title,
  authors,
  thumbnail,
  pageCount,
  description,
  buttonTitle,
  buttonIcon,
  buttonOnPress,
}: BookProps) {
  const sx = useSx()

  const container = sx({
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  })

  const contentStyles = sx({
    height: 'auto',
    width: '65%',
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
      buttonOnPress={buttonOnPress}
    />
  )

  const snapPoints = useMemo(() => ['95%'], [])

  function CustomBackground({ style }: BottomSheetBackgroundProps) {
    const containerAnimatedStyle = sx({ backgroundColor: '$background' })
    const containerStyle = useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle]
    )
    return <Animated.View pointerEvents="none" style={containerStyle} />
  }

  const truncatedTitle = truncateEnd(title, 50)
  const truncatedAuthors =
    authors && authors.length > 0 && truncateEnd(authors.join(', '), 35)

  return (
    <View sx={container}>
      <AnimatedPressable
        style={contentStyles}
        onPress={handlePresentModalPress}
      >
        {thumbnail && (
          <ThumbnailImage
            src={thumbnail}
            style={{
              marginRight: 10,
            }}
          />
        )}
        <View sx={textContainer}>
          <Text variant="bookTitle">{truncatedTitle}</Text>
          {truncatedAuthors ? (
            <Text>By {truncatedAuthors}</Text>
          ) : (
            <Text>No authors data</Text>
          )}
          <PageCounter count={pageCount} />
        </View>
      </AnimatedPressable>
      <View sx={buttonContainer}>
        <Button
          type="secondary"
          round
          title={buttonTitle}
          onPress={() => buttonOnPress?.()}
          iconName={buttonIcon}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={shadowStyle}
        backgroundComponent={CustomBackground}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.$text,
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
