import { useColorScheme } from '@/helpers/useColorScheme'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

export default function CardLoader() {
  const { colorScheme } = useColorScheme()
  return (
    <ContentLoader
      speed={2}
      height={160}
      width={450}
      viewBox="0 0 450 160"
      backgroundColor={colorScheme === 'dark' ? '#121212' : '#f3f3f3'}
      foregroundColor={colorScheme === 'dark' ? '#242424' : '#ecebeb'}
    >
      <Rect x="10" y="10" rx="8" ry="8" width="100" height="150" />
      <Rect x="124" y="10" rx="4" ry="4" width="250" height="20" />
      <Rect x="124" y="40" rx="4" ry="4" width="150" height="15" />
      <Rect x="124" y="65" rx="4" ry="4" width="100" height="10" />
    </ContentLoader>
  )
}
