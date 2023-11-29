import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './scroll.css'

export function SelectInput({ options, placeHolder, onSelectOption, value }) {

    const [openselect, setOpenSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value); // Agregado estado selectedOption

    useEffect(() => {
        setSelectedOption(value); // Actualizar selectedOption cuando el valor cambie
    }, [value]);

    function selectvalue(option) {
        setSelectedOption(option);
        setOpenSelect(false);
        onSelectOption(option); // Llama a la función proporcionada como prop
    }

    function openOption() {
        setOpenSelect(true);
    }
    return (
        <>
            <input
                value={selectedOption ? selectedOption.nombre : ''}
                onClick={openOption}
                onBlur={() => {
                    setOpenSelect(false);
                }}
                id="league"
                type="text"
                placeholder={placeHolder}
                readOnly
            />

            <div className={openselect ? "absolute w-fit visible max-h-28 overflow-visible opacity-100 bg-yellow-700 z-10 px-6 overflow-y-auto" : "absolute w-full max-h-28 bg-yellow-700 rounded-sm top-full hidden -translate-y-10 overflow-hidden overflow-y-auto transition text-yellow-500"}>
                {options.map((item, index) => (
                    <li onMouseDown={() => selectvalue(item)} key={index} className="z-20 bg-slate-400">
                        {item.nombre}
                    </li>
                ))}
            </div >
        </>
    );
}

SelectInput.propTypes = {
    options: PropTypes.node.isRequired,
    placeHolder: PropTypes.node.isRequired,
    onSelectOption: PropTypes.node.isRequired,
    value: PropTypes.node,
};