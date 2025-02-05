import vine from '@vinejs/vine'

export const createCountryValidator = vine.compile(
    vine.object({
      name: vine
        .string()
        .trim()
        .unique(async (db, value) => {
          const country = await db.from('countries').where('name', value).first()
  
          return !country
        }),
    })
  )