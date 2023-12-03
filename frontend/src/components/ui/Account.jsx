import { useState } from "react";
import { UserIcon } from './UserIcon'
import { useAuth } from "../../context/AuthContext";
import { MdLogout, MdPerson } from "react-icons/md";
import { Link } from 'react-router-dom'
export function Account() {
    const [modal, setModal] = useState(false);
    const { user, logout } = useAuth();
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className="flex flex-row gap-2 items-center" onClick={toggleModal}>
                <UserIcon userName={user.nombre} />
                <li>{user.nombre}</li>
            </div>

            {modal && (
                <div className="w-full h-full top-0 left-0 right-0 bottom-0 fixed z-10">
                    <div onClick={toggleModal} className="w-full h-full top-0 left-0 right-0 bottom-0 fixed"></div>
                    <div className="fixed top-20 right-1 py-3 px-3 max-w-[260px] bg-panel-dark rounded-md">
                        <div className="flex flex-col gap-y-3">
                            <h2 className="font-bold w-[260px] text-xl">Perfil</h2>
                            <div className="flex flex-row items-center gap-x-4">
                                <UserIcon userName={user.nombre} />
                                <div className="flex flex-col">
                                    <span className="font-bold">{user.nombre}</span>
                                    <span className="text-text-gray">{user.correo}</span>
                                </div>
                            </div>
                            <Link to={`/profile/${user.carnet}`} className="flex flex-row gap-x-2 items-center my-2 hover:text-gray-400 transition-transform hover:transition-all ease-in-out duration-150">
                                <MdPerson size={22} />
                                <span>Mi Perfil</span>
                            </Link>
                            <div className="w-[98%] border border-border-dark"></div>
                            <div className="flex flex-row gap-x-2 items-center my-2 hover:text-gray-400 transition-transform hover:transition-all ease-in-out duration-150" onClick={() => logout()}>
                                <MdLogout size={22} />
                                <Link to="/login">Cerrar Sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}