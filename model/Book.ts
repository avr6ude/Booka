import { Model } from '@nozbe/watermelondb'
import { field, children, lazy } from '@nozbe/watermelondb/decorators'

class Book extends Model {
  static table = 'books'

  @field('title') title!: string
  @field('description') description!: string
  @field('page_count') pageCount!: number
  @field('small_thumbnail') smallThumbnail!: string
  @field('thumbnail') thumbnail!: string

  @children('authors') authors!: any
  @children('industry_identifiers') industryIdentifiers!: BookData

  @lazy
  fullTitle = this.title.concat(' - ', this.description)
}
