import z from 'zod'

const comSchema = z.object({
    contenido: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    carnet: z.number().int({
        invalid_type_error: 'El carnet debe ser un numero entero',
        required_error: 'El carnet es requerido'
    }).min(190000000).max(204099999),
    idPub: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    carnetOriginal: z.number().int({
        invalid_type_error: 'El carnet debe ser un numero entero',
        required_error: 'El carnet es requerido'
    }).min(190000000).max(204099999)
})

export function validateCom(input) {
    return comSchema.safeParse(input)
}
