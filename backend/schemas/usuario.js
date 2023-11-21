import z from 'zod'

const userSchema = z.object({
    carnet: z.number().int({
        invalid_type_error: 'El carnet debe ser un numero entero',
        required_error: 'El carnet es requerido'
    }).min(190000000).max(204099999),
    nombre: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    apellido: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    contrasena: z.string({
        invalid_type_error: 'La contraseña debe ser una cadena de caracteres',
        required_error: 'La contraseña es requerida'
    }),
    correo: z.string({
        invalid_type_error: 'El correo debe ser una cadena de caracteres',
        required_error: 'El correo es requerido'
    })
})

const courseSchema = z.object({
    carnet: z.number().int({
        invalid_type_error: 'El carnet debe ser un numero entero',
        required_error: 'El carnet es requerido'
    }).min(190000000).max(204099999),
    idCurso: z.string({
        invalid_type_error: 'El id del curso debe ser una cadena de caracteres',
        required_error: 'El id_curso es requerido'
    })
})

export function validateUser(input) {
    return userSchema.safeParse(input)
}

export function validateCourses(input) {
    return courseSchema.safeParse(input)
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input)
}
