import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../utilities.css"
import { Toaster, toast } from 'sonner';
import { Card } from '../components/ui/Card'

function LoginPage() {
    const { signin, errors: registerErrors, isAuthenticated } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = handleSubmit(data => {
        signin(data)
    })
    const navigate = useNavigate()
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
                <h1 className='text-2xl font-bold text-white text-center'>Login</h1>
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <input type="number" {...register("carnet", { required: true, valueAsNumber: true })}
                        className='remove-arrow w-full bg-sub-dark text-white px-4 py-2 rounded-md my-2 placeholder-zinc-300'
                        placeholder='Carnet'
                        min={1} />
                    {errors.carnet && (<p className='text-red-400  my-1'>Carnet es requerido</p>)}

                    <input type="password" {...register("contrasena", { required: true })}
                        className=' w-full bg-sub-dark text-white px-4 py-2 rounded-md my-2 placeholder-zinc-300'
                        placeholder='Contraseña' />
                    {errors.contrasena && (<p className='w-full text-red-400'>Contraseña es requerida</p>)}
                    <button type='submit' className='px-2 py-2 bg-blue-500 rounded-md my-2 text-white hover:bg-blue-600 hover:ease-in transition-colors'>
                        Login
                    </button>
                </form >
                <p className='flex justify-between my-2'>
                    <span className='text-white'>¿No tienes cuenta?</span> <Link to="/register" className='text-sky-500 hover:text-sky-400 hover:ease-in transition-colors'>Registrate</Link>
                </p>
            </Card>
            <Toaster position="top-center" richColors theme="dark" />
        </div>
    )
}

export default LoginPage