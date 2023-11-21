import z from 'zod'

const teacherSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    apellido: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    })
})

const CourseSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de caracteres',
        required_error: 'El nombre es requerido'
    }),
    creditos: z.number().int({
        invalid_type_error: 'El carnet debe ser un numero entero',
        required_error: 'El carnet es requerido'
    }).min(1).max(20)
})

export function validateTeacher(input) {
    return teacherSchema.safeParse(input)
}

export function validateCourse(input) {
    return CourseSchema.safeParse(input)
}
