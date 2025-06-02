import { db } from '@/db'
import { authors, books } from '@/db/schema'

function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

const mockBooks = [
  {
    id: generateId(),
    title: 'The Great Gatsby',
    description:
      'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    page_count: 180,
    cover: 'https://example.com/gatsby.jpg',
    isbn10: '0743273567',
    isbn13: '9780743273565',
  },
  {
    id: generateId(),
    title: 'To Kill a Mockingbird',
    description:
      'The story of racial injustice and the loss of innocence in the American South.',
    page_count: 281,
    cover: 'https://example.com/mockingbird.jpg',
    isbn10: '0446310786',
    isbn13: '9780446310789',
  },
  {
    id: generateId(),
    title: '1984',
    description:
      'A dystopian social science fiction novel and cautionary tale.',
    page_count: 328,
    cover: 'https://example.com/1984.jpg',
    isbn10: '0451524934',
    isbn13: '9780451524935',
  },
]

const mockAuthors = [
  { name: 'F. Scott Fitzgerald' },
  { name: 'Harper Lee' },
  { name: 'George Orwell' },
]

export async function seed() {
  try {
    for (const book of mockBooks) {
      await db.insert(books).values(book)
    }

    for (let i = 0; i < mockBooks.length; i++) {
      await db.insert(authors).values({
        bookId: mockBooks[i].id,
        name: mockAuthors[i].name,
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
