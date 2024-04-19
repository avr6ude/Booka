import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { children, field, lazy } from '@nozbe/watermelondb/decorators'
import Author from './Author'

class Book extends Model {
  static table = 'books'
  static associations: Associations = {
    authors: { type: 'has_many', foreignKey: 'book_id' },
    industryIdentifiers: { type: 'has_many', foreignKey: 'book_id' },
  }
  @field('title') title!: string
  @field('description') description!: string
  @field('page_count') pageCount!: number
  @field('cover') cover!: string
  @field('isbn10') isbn10!: string
  @field('isbn13') isbn13!: string

  @children('authors') authors!: Author[]

  @lazy fullTitle = this.title.concat(' - ', this.description)
}

export default Book
