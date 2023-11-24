import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
    const { signin, errors: registerErrors, isAuthenticated } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = handleSubmit(data => {
        signin(data)
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) navigate("/publications")
    }, [isAuthenticated])
    return (
        <div className='flex h-screen items-center justify-center bg-zinc-800'>
            <div className='bg-zinc-600 max-w-md w-full p-10 rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="number" {...register("carnet", { required: true, valueAsNumber: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Carnet' />
                    {errors.carnet && (<p className='text-red-400'>Carnet es requerido</p>)}

                    <input type="password" {...register("contrasena", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña' />
                    {errors.contrasena && (<p className='w-full text-red-400'>Carnet es requerido</p>)}
                    <button type='submit' className='px-2 py-1 bg-blue-600 rounded-md'>
                        Login
                    </button>
                </form >
                <p className='flex gap-x-2 justify-between'>
                    No tienes cuenta? <Link to="/register" className='text-sky-500'>Registrate</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage