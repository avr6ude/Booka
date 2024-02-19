import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

class IndustryIdentifier extends Model {
  static table = 'industry_identifiers'
  static associations = {
    books: { type: 'belongs_to', key: 'book_id' },
  }

  @field('type') type!: string
  @field('identifier') identifier!: string
  @relation('books', 'book_id') book!: BookData // Specify the correct type if available
}
