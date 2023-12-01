import { Navbar } from '../components/ui/Navbar'
import { CardCreate } from '../components/ui/CardCreate'
// import { CardPub } from '../components/ui/CardPub'
import { useAuth } from '../context/AuthContext'
function Init() {
    const { user } = useAuth()
    console.log(user.nombre)
    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='w-full flex justify-center flex-col items-center gap-4'>
                <CardCreate userName={user.nombre} />
                {/* <CardPub userName={"Pedro"} title="Titulo" date="Hoy" content="Texto de prueba" about={"Introduccion a la programacion 2"} /> */}
            </div>
        </>
    )
}

export default Init