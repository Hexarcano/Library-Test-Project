import vine from '@vinejs/vine'

export const createGenreValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const language = await db.from('genres').where('name', value).first()

        return !language
      }),
  })
)
