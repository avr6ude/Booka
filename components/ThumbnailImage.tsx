import { Image, SxProp, useSx } from 'dripsy'

export default function ThumbnailImage({
  src,
  style,
}: {
  src: string | undefined
  style?: SxProp
}) {
  const sx = useSx()

  const imageStyle = sx({
    width: 100,
    height: 150,
    borderRadius: 8,
  })
  const mergedStyle = sx({
    ...imageStyle,
    ...style,
  })

  return <Image src={src} sx={mergedStyle} />
}
