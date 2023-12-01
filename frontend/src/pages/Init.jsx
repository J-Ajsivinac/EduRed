import { Navbar } from '../components/ui/Navbar'
import { CardCreate } from '../components/ui/CardCreate'
import { CardPub } from '../components/ui/CardPub'
import { useAuth } from '../context/AuthContext'
import { usePubs } from '../context/PubContext'
import { useEffect } from "react";
function Init() {
    const { user } = useAuth()
    const { pubs, getPubs } = usePubs()

    useEffect(() => {
        getPubs()
    }, [])

    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='w-full flex justify-center flex-col items-center gap-4'>
                <CardCreate userName={user.nombre} />
                {/* <CardPub userName={"Pedro"} title="Titulo" date="Hoy" content="Texto de prueba" about={"Introduccion a la programacion 2"} /> */}
                {pubs.map((pub, index) => (
                    // <li key={index} className="z-20 list-none text-white">
                    //     {pub.titulo}
                    // </li>
                    <CardPub key={index} userName={pub.usuario_carnet} title={pub.titulo} date={pub.fecha_f} content={pub.mensaje} about={pub.acercade} />
                ))}
            </div>
        </>
    )
}

export default Init