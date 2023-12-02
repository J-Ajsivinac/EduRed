import { Navbar } from '../components/ui/Navbar'
import { CardCreate } from '../components/ui/CardCreate'
import { CardPub } from '../components/ui/CardPub'
import { useAuth } from '../context/AuthContext'
import { usePubs } from '../context/PubContext'
import { useEffect, useState } from "react";
function Init() {
    const { user } = useAuth()
    const { pubs, getPubs } = usePubs()
    const [newPub, setNewPub] = useState(null);
    const { createPub } = usePubs();
    useEffect(() => {
        getPubs()
    }, [])

    useEffect(() => {
        if (newPub) {
            setNewPub(null);
            getPubs()
        }
    }, [newPub]);

    const handleCreatePub = async (values) => {
        createPub(values);
    };
    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='mt-20 w-full flex justify-center flex-col items-center gap-4 my-4'>
                <CardCreate userName={user.nombre} onCreatePub={handleCreatePub} />
                {/* <CardPub userName={"Pedro"} title="Titulo" date="Hoy" content="Texto de prueba" about={"Introduccion a la programacion 2"} /> */}
                {pubs.map((pub, index) => (
                    // <li key={index} className="z-20 list-none text-white">
                    //     {pub.titulo}
                    // </li>
                    <CardPub key={index} userName={pub.nombre} title={pub.titulo} date={pub.fecha_f} content={pub.mensaje} about={pub.acercade} number={pub.numero_comentarios} id={pub.idpublicacion} click={true} />
                ))}
            </div>
        </>
    )
}

export default Init