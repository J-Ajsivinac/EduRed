import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Toaster, toast } from 'sonner';
import "../utilities.css"

function RegisterPage() {
    const { signup, errors: registerErrors, isAuthenticated } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log(user)
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async values => {
        signup(values)
    })
    useEffect(() => {
        if (isAuthenticated) navigate("/init")
    }, [isAuthenticated])

    useEffect(() => {
        registerErrors.forEach((message) => {
            toast.error(`${message}`, { duration: 2000 })
        })
    },)
    return (
        <div className='flex h-screen items-center justify-center bg-bg-dark'>
            <Card>
                <h1 className='text-2xl font-bold text-white text-center'>Registrate</h1>
                {/* <div>Registrar</div> */}
                <form onSubmit={onSubmit}>
                    <input type="number" {...register("carnet", { required: true, valueAsNumber: true })}
                        className='remove-arrow w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Carnet'
                        min={1} />
                    {errors.carnet && (<p className='text-red-400'>Carnet es requerido</p>)}
                    <input type="text" {...register("nombre", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='nombre' />
                    {errors.nombre && (<p className='w-full text-red-400'>Nombre es requerido</p>)}
                    <input type="text" {...register("apellido", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Apellido' />
                    {errors.apellido && (<p className='w-full text-red-400'>apellido es requerido</p>)}
                    <input type="email" {...register("correo", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Correo' />
                    {errors.carnet && (<p className='text-red-400'>email es requerido</p>)}
                    <input type="password" {...register("contrasena", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña' />
                    {errors.contrasena && (<p className='w-full text-red-400'>Contraseña es requerido</p>)}
                    <button type='submit' className='px-2 py-1 bg-blue-500 rounded-md'>
                        Registrar
                    </button>
                </form >
                <p className='flex justify-between my-2'>
                    <span className='text-white'>¿Ya tienes cuenta?</span> <Link to="/login" className='text-sky-500 hover:text-sky-400 hover:ease-in transition-colors'>Iniciar Sesión</Link>
                </p>
            </Card>
            <Toaster position="top-center" richColors theme="dark" />
        </div >
    )
}

export default RegisterPage