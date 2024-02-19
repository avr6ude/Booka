interface BookData {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    industryIdentifiers: {
      type: string
      identifier: string
    }
    pageCount: number
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
  }
}
