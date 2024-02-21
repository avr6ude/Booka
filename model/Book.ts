import { Model } from '@nozbe/watermelondb'
import { field, children, lazy } from '@nozbe/watermelondb/decorators'
import IndustryIdentifier from './IndustryIdentifier'
import { Associations } from '@nozbe/watermelondb/Model'

class Book extends Model {
  static table = 'books'
  static associations: Associations = {
    authors: { type: 'has_many', foreignKey: 'book_id' },
    industryIdentifiers: { type: 'has_many', foreignKey: 'book_id' },
  }

  @field('title') title!: string
  @field('description') description!: string
  @field('page_count') pageCount!: number
  @field('small_thumbnail') smallThumbnail!: string
  @field('thumbnail') thumbnail!: string

  @children('authors') authors!: any
  @children('industry_identifiers') industryIdentifiers!: IndustryIdentifier[]

  @lazy
  fullTitle = this.title.concat(' - ', this.description)
}

export default Book
