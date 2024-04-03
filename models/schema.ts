import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'books',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'page_count', type: 'number' },
        { name: 'small_thumbnail', type: 'string' },
        { name: 'thumbnail', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'authors',
      columns: [
        { name: 'book_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'industry_identifiers',
      columns: [
        { name: 'book_id', type: 'string', isIndexed: true },
        { name: 'type', type: 'string' },
        { name: 'identifier', type: 'string' },
      ],
    }),
  ],
})
