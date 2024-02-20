import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { field, relation } from '@nozbe/watermelondb/decorators'

class Author extends Model {
  static table = 'authors'
  static associations: Associations = {
    books: { type: 'belongs_to', key: 'book_id' },
  }

  @field('name') name!: string
  @field('book_id') book_id!: string

  @relation('books', 'book_id') book!: BookData // Specify the correct type if available
}

export default Author
