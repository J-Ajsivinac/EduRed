// import { Link } from "react-router-dom";
import { Navbar } from '../components/ui/Navbar'
import { useAuth } from "../context/AuthContext";
import { useParams } from 'react-router-dom'
import { usePubs } from '../context/PubContext'
import { useEffect } from "react";
import { CardPub } from '../components/ui/CardPub'
import "../components/ui/loader.css";
import { UserIcon } from '../components/ui/UserIcon'
import { ButtonSend } from '../components/ui/ButtonSend'
import { CardCom } from '../components/ui/CardCom'
import { createComRequest } from '../api/pub'
import { useForm } from 'react-hook-form'

function Publications() {
    // logout
    const { user } = useAuth();
    const { pub, getPubByID, getComments, comments } = usePubs()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    useEffect(() => {
        getPubByID(id)
        getComments(id)
    }, [])

    const createCom = async (pub) => {
        try {
            const res = await createComRequest(pub);
            getComments(id);
            getPubByID(id)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = handleSubmit(async values => {
        values["carnet"] = user.carnet
        values["idPub"] = id
        values["carnetOriginal"] = pub.carnet
        createCom(values)
        reset()
    });

    if (!pub || pub.length === 0) {
        return (<div className="w-full h-screen flex items-center justify-center">
            <span className="loader"></span>
        </div>);
    }
    console.log("comments, xd", comments)
    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='mt-20 w-full flex justify-center flex-col items-center gap-4 my-4'>
                <CardPub
                    userName={pub.nombre}
                    title={pub.titulo}
                    date={pub.fecha_f}
                    content={pub.mensaje}
                    about={pub.acercade}
                    number={pub.numero_comentarios}
                    id={pub.idpublicacion}
                />

                <form className='w-3/5 flex flex-col bg-panel-dark py-4 rounded-md px-4 ' onSubmit={onSubmit}>
                    <div className='flex w-full flex-row items-center gap-4'>
                        <UserIcon userName={user.nombre} className="w-fit"></UserIcon>
                        <textarea className=' pt-2 px-2 resize-none w-[93%] bg-sub-dark rounded-md h-16 text-white outline-none' placeholder='Comentario'
                            {...register("contenido", { required: true })} />
                    </div>
                    {errors.contenido && (<p className='text-red-400 px-12 my-2'>Contenido del comentario requerido</p>)}
                    <div className='w-1/ px-12 mt-3'>
                        <ButtonSend text="Comentar" />
                    </div>
                </form>
                <div className='w-3/5 flex rounded-md'>
                    <h3 className='text-white items-start font-bold my-1 px-2 '>
                        {pub.numero_comentarios === 1 ? '1 Comentario' : `${pub.numero_comentarios} Comentarios`}
                    </h3>
                </div>
                <div className='w-full flex justify-center items-center flex-col gap-4'>
                    {comments && comments.length > 0 ? comments.map((com, index) => (
                        <CardCom key={index} userName={com.nombre} date={com.fecha_f} content={com.contenido} />
                    )) : <p className='text-white'>No hay comentarios disponibles</p>}
                </div>

            </div>
        </>
    );
}

export default Publications