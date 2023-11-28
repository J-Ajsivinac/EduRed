import { useState } from "react";
import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import { MdOutlineCreate } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";
import "./scroll.css"
import { SelectInput } from './SelectInput'
export function CardCreate({ userName }) {
    const [modalC, setModalC] = useState(false);

    const toggleModal = () => {
        setModalC(!modalC);
    };

    const typesPub = [
        "Catedratico",
        "Curso"
    ]

    const Pubs = [
        "Catedratico",
        "Curso",
        "Curso",
        "Curso",
        "Curso",
        "Curso",
        "Curso",
        "Curso",
        "Curso"
    ]


    document.body.classList.toggle('active-modal')
    return (
        <div className='flex w-3/5 bg-panel-dark p-3 rounded-lg'>
            <div className="flex w-full flex-row  items-center gap-4">
                <UserIcon userName={userName} />
                <input type="text" name="" id="" className='resize-none w-full rounded-lg px-4 py-2 bg-sub-dark' placeholder='Publicar' onClick={toggleModal}></input>
            </div>
            {modalC && (
                <div className="w-full h-screen top-0 left-0 right-0 bottom-0 fixed z-0">
                    <div onClick={toggleModal} className="w-full h-screen top-0 left-0 right-0 bottom-0 fixed backdrop-blur-sm"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 py-3 px-3 rounded-md max-w-xl min-w-[450px]">
                        <form className="flex flex-col w-full h-full gap-y-3">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-1">
                                    <MdOutlineCreate />
                                    <span>Crear Publicación</span>
                                </div>
                                <button className="" onClick={toggleModal}>
                                    <CgCloseR />
                                </button>
                            </div>
                            <div className="flex flex-row g-3 w-full justify-between">
                                <div className="w-[47%]">
                                    <SelectInput options={typesPub} placeHolder={"Tipo Publicación"} />
                                </div>
                                <div className="w-[47%]">
                                    <SelectInput options={Pubs} placeHolder={"Catedratico/Curso"} />
                                </div>
                            </div>
                            <div className="flex flex-row g-2 w-full">
                                <input type="text" name="" id="" className="w-full" placeholder="Titulo" />
                            </div>
                            <div className="flex flex-row g-2 w-full">
                                <textarea name="" id="" rows="4" className="w-full resize-none" placeholder="Contenido" ></textarea>
                            </div>
                            <div className="flex flex-row g-2 w-full justify-end">
                                <button type="submit" className="px-4 bg-slate-400 py-1 rounded-md">Publicar</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

CardCreate.propTypes = {
    userName: PropTypes.node.isRequired,
};