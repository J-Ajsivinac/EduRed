import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
    const { signup, errors: registerErrors, isAuthenticated } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log(user)
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async values => {
        signup(values)
    })
    useEffect(() => {
        if (isAuthenticated) navigate("/publications")
    }, [isAuthenticated])
    return (
        <div className='bg-slate-500 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 my-2 text-center' key={i}>
                        {error}
                    </div>
                ))
            }
            {/* <div>Registrar</div> */}
            <form onSubmit={onSubmit}>
                <input type="number" {...register("carnet", { required: true, valueAsNumber: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Carnet' />
                {errors.carnet && (<p className='text-red-400'>Carnet es requerido</p>)}
                <input type="text" {...register("nombre", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='nombre' />
                {errors.nombre && (<p className='w-full text-red-400'>Carnet es requerido</p>)}
                <input type="text" {...register("apellido", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Apellido' />
                {errors.apellido && (<p className='w-full text-red-400'>Carnet es requerido</p>)}
                <input type="email" {...register("correo", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Correo' />
                {errors.correo && (<p className='w-fulltext-red-400'>Carnet es requerido</p>)}
                <input type="password" {...register("contrasena", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Contraseña' />
                {errors.contrasena && (<p className='w-full text-red-400'>Carnet es requerido</p>)}
                <button type='submit' className='px-2 py-1 bg-blue-600 rounded-md'>
                    Registrar
                </button>
            </form >
            <p className='flex gap-x-2 justify-between'>
                Ya tienes cuenta? <Link to="/login" className='text-sky-500'>Iniciar Sesión</Link>
            </p>
        </div >
    )
}

export default RegisterPage