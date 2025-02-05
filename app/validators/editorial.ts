import vine from '@vinejs/vine'

export const createEditorialValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    bussiness_name: vine.string().trim(),
    address: vine.string().trim(),
    country_id: vine.number().withoutDecimals(),
    postal_code: vine.number().withoutDecimals(),
  })
)
