import vine from '@vinejs/vine'

export const createAuthorValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    birthDate: vine.date(),
  })
)
