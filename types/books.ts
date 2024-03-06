export interface BookData {
  id: string
  volumeInfo: VolumeInfo
}

export interface VolumeInfo {
  title: string
  authors: string[]
  description: string
  industryIdentifiers: IndustryIdentifierData
  pageCount: number
  imageLinks: ImageLinksData
}
export interface IndustryIdentifierData {
  type: string
  identifier: string
}
export interface ImageLinksData {
  smallThumbnail: string
  thumbnail: string
}
