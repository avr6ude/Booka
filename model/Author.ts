import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

class Author extends Model {
  static table = 'authors'
  static associations = {
    books: { type: 'belongs_to', key: 'book_id' },
  }

  @field('name') name!: string
  @relation('books', 'book_id') book!: BookData // Specify the correct type if available
}
