import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import { MdOutlineCreate } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";
import "./scroll.css"
import { SelectInput } from './SelectInput'
import { usePubs } from "../../context/PubContext";
import { useForm } from 'react-hook-form'
export function CardCreate({ userName }) {
    const [modalC, setModalC] = useState(false);
    const { courses, getCourses, createPub, getTeachers } = usePubs();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionType, setSelectedOptionType] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const toggleModal = () => {
        setModalC(!modalC);
    };

    const typesPub = [
        {
            id: 1,
            nombre: "Catedratico"
        }, {
            id: 2,
            nombre: "Curso"
        }
    ]
    // var coursesList
    useEffect(() => {
        if (selectedOptionType === null) {
            return
        }
        if (selectedOptionType === 1) {
            getTeachers()
        } else {
            getCourses()
        }
    }, [selectedOptionType])

    const handleSelectOptionType = (option) => {
        setSelectedOption(null)
        if (option) {
            setSelectedOptionType(option.id);
            setSelectedOption(null);
        }
    };

    const handleSelectOption = (option) => {
        if (option) {
            if (selectedOptionType === 1) {
                setSelectedOption(option.idcatedratico);
            } else if (selectedOptionType === 2) {
                setSelectedOption(option.idcurso);
            }
        }
    };


    const onSubmit = handleSubmit(async values => {
        console.log(selectedOptionType, selectedOption)
        // Aquí puedes acceder al ID de la opción seleccionada
        if (selectedOption && selectedOptionType) {
            values["tipo"] = selectedOptionType
            values["acercade"] = selectedOption
            // console.log(values)
            createPub(values)


        } else {
            console.log('Una opción o varias opcioens no esta seleccionada');
        }
    });


    // console.log(coursesList)

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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 py-3 px-3 rounded-md  min-w-[450px]">
                        <form className="flex flex-col w-full h-full gap-y-3" onSubmit={onSubmit}>
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
                                    <SelectInput options={typesPub} placeHolder={"Tipo Publicación"} onSelectOption={handleSelectOptionType} />
                                </div>
                                <div className="w-[47%]">
                                    <SelectInput options={courses} placeHolder={"Catedratico/Curso"} onSelectOption={handleSelectOption} value={selectedOption} />
                                </div>
                            </div>
                            <div className="flex flex-col g-2 w-full">
                                <input type="text" name="" id="" className="w-full" placeholder="Titulo"
                                    {...register("titulo", { required: true })} />
                                {errors.titulo && (<p className='text-red-400'>Titulo es requerido</p>)}
                            </div>
                            <div className="flex flex-col g-2 w-full">
                                <textarea name="" id="" rows="4" className="w-full resize-none" placeholder="Contenido"
                                    {...register("mensaje", { required: true })} />
                                {errors.mensaje && (<p className='text-red-400'>Titulo es requerido</p>)}
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