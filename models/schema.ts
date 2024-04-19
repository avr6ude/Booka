import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 4,
  tables: [
    tableSchema({
      name: 'books',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'page_count', type: 'number' },
        { name: 'cover', type: 'string' },
        { name: 'isbn10', type: 'string' },
        { name: 'isbn13', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'authors',
      columns: [
        { name: 'book_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
      ],
    }),
  ],
})
