import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    isbn: vine.string().trim().fixedLength(13),
    name: vine.string().trim(),
    edition: vine.number(),
    publication_date: vine.date(),
    authors: vine.array(vine.number().positive()),
    genres: vine.array(vine.number().positive()),
    editorials: vine.array(vine.number().positive()),
    country_id: vine.number().positive(),
    language_id: vine.number().positive(),
  })
)
