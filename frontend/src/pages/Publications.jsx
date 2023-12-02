// import { Link } from "react-router-dom";
import { Navbar } from '../components/ui/Navbar'
import { useAuth } from "../context/AuthContext";
import { useParams } from 'react-router-dom'
import { usePubs } from '../context/PubContext'
import { useEffect } from "react";
import { CardPub } from '../components/ui/CardPub'
import "../components/ui/loader.css";
function Publications() {
    // logout
    const { user } = useAuth();
    const { pub, getPubByID, getComments, comments } = usePubs()
    const { id } = useParams()
    useEffect(() => {
        getPubByID(id)
        getComments(id)
    }, [])
    if (pub.length === 0) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loader"></span>
        </div>;
    }
    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='mt-20 w-full flex justify-center flex-col items-center gap-4 my-4'>
                <CardPub userName={pub.nombre} title={pub.titulo} date={pub.fecha_f} content={pub.mensaje} about={pub.acercade} number={pub.numero_comentarios} id={pub.idpublicacion} />
                <div className='w-3/5 flex bg-panel-dark py-2 rounded-md px-4'>
                    <h3 className='text-white items-start font-bold my-1 px-2 '>
                        {pub.numero_comentarios === 1 ? '1 Comentario' : `${pub.numero_comentarios} Comentarios`}
                    </h3>
                </div>
                <div className='w-full flex justify-center items-center flex-col gap-4'>
                    {comments.map((com, index) => (
                        // <li key={index} className="z-20 list-none text-white">
                        //     {com.titulo}
                        // </li>
                        <CardPub key={index} userName={com.usuario_carnet} title={"titulo"} date={com.fecha_f} content={com.contenido} about={"DD"} number={"?"} id={"XD"} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Publications