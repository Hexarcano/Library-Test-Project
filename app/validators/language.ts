import vine from '@vinejs/vine'

export const createLanguageValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const language = await db.from('languages').where('name', value).first()

        return !language
      }),
  })
)
