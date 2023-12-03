import { useState, useEffect } from "react";
import { PiPlusCircleFill } from "react-icons/pi";
import { usePubs } from "../../context/PubContext";
import { SelectInput } from '../ui/SelectInput'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

export function ModalC({ onAddCourse }) {
    const [modalC, setModalC] = useState(false);
    const { user } = useAuth()
    const { courses, getCourses } = usePubs();
    const [selectedOption, setSelectedOption] = useState(null);
    const { handleSubmit } = useForm()
    const toggleModalC = () => {
        setModalC(!modalC);
    };

    useEffect(() => {
        getCourses()
    }, [])

    const handleSelectOption = (option) => {
        console.log(option)
        if (option) {
            setSelectedOption(option.idcurso);
        }
    };

    if (modalC) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const onSubmit = handleSubmit(async values => {
        // Aquí puedes acceder al ID de la opción seleccionada
        if (selectedOption) {
            values["idCurso"] = selectedOption
            values["carnet"] = user.carnet
            // console.log(values)
            onAddCourse(values)
            setSelectedOption(null)
        } else {
            console.log('Una opción o varias opcioens no esta seleccionada');
        }
    });

    return (
        <>
            <button onClick={toggleModalC} className='text-white px-3 gap-2 py-1 rounded-md flex flex-row border-[3px] border-button-gray items-center'><PiPlusCircleFill size={22} />Agregar Curso</button>

            {modalC && (
                <div className="absolute w-full h-full z-10">
                    <div onClick={toggleModalC} className="fixed w-full h-full top-0 left-0 right-0 bottom-0"></div>
                    <form onSubmit={onSubmit} className="absolute flex flex-col gap-4 right-1 top-12 py-3 px-4 max-w-[400px] bg-sub-dark/50 rounded-md backdrop-blur-sm border border-white/30">

                        <SelectInput options={courses} placeHolder={"Curso"} onSelectOption={handleSelectOption} value={selectedOption} />
                        {/* <button className="absolute top-2 right-2 px-2 py-1" onClick={toggleModalC}>
                                x
                            </button> */}
                        <button className="py-1 w-full bg-blue-500 rounded-md">Agregar</button>
                    </form>
                </div>
            )}
        </>
    )
}