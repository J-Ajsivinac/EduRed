import { useParams } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { useAuth } from "../context/AuthContext";
import { Item } from '../components/ui/Item'
import { PiPlusCircleFill } from "react-icons/pi";

function Profile() {
    const { id } = useParams()
    const { user } = useAuth();
    console.log(user)
    return (
        <>
            <Navbar userName={user.nombre} />
            <div className='mt-20 w-full flex justify-center flex-col items-center gap-4 my-4'>
                <div className='flex flex-row w-3/5 items-stretch justify-between gap-4'>
                    <div className='bg-panel-dark flex-[5] rounded-md p-5'>
                        <div className='flex flex-row items-center gap-4 justify-between'>
                            <div className='flex flex-row items-center gap-4'>
                                <div className='w-24 h-24 rounded-full bg-[#ebd7ca] text-[#191920] flex items-center justify-center text-4xl font-bold'>{user.nombre[0]}</div>
                                <div className='flex flex-col'>
                                    <div className='text-white font-bold'>{user.nombre}</div>
                                    <div className='text-text-gray'>{user.correo}</div>
                                </div>
                            </div>
                            {
                                parseInt(id) === user.carnet ? <button className='text-white px-5 py-1 rounded-md border-[3px] border-button-gray'>Editar Perfil</button>
                                    : null
                            }
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-panel-dark flex-[2] rounded-md gap-2'>
                        <div className='text-white font-bold text-lg'>Creditos</div>
                        <div className='text-3xl font-bold text-[#c1e3df]'>0</div>
                    </div>
                </div>
                <div className='flex flex-col w-3/5 items-stretch justify-between gap-2 text-white py-4 px-5 rounded-md bg-panel-dark'>
                    <div className='w-full flex flex-row justify-between py-1'>
                        <span className='flex items-center justify-center font-bold '>
                            Cursos Aprobados
                        </span>
                        {
                            parseInt(id) === user.carnet ? <button className='text-white px-3 gap-2 py-1 rounded-md flex flex-row border-[3px] border-button-gray items-center'><PiPlusCircleFill size={22} />Agregar Curso</button>
                                : null
                        }
                    </div>
                    <div className='w-full flex flex-row px-6 mt-2 py-4 justify-between bg-sub-dark rounded-lg'>
                        <div className='flex flex-row gap-4'>
                            <span className=''>Nombre del Curso</span>
                        </div>
                        <span>Creditos</span>
                    </div>
                    <Item name={"IPC-2"} number={6} />
                    <Item name={"IPC-2"} number={6} />
                    <Item name={"IPC-2"} number={6} />
                </div>
            </div>
        </>
    )
}

export default Profile