import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { field, relation } from '@nozbe/watermelondb/decorators'

class IndustryIdentifier extends Model {
  static table = 'industry_identifiers'
  static associations: Associations = {
    books: { type: 'belongs_to', key: 'book_id' },
  }

  @field('type') type!: string
  @field('identifier') identifier!: string
  @field('book_id') book_id!: string

  @relation('books', 'book_id') book!: BookData // Specify the correct type if available
}

export default IndustryIdentifier
