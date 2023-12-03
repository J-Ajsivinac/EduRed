import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './scroll.css'
import { MdKeyboardArrowDown } from "react-icons/md";
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
        <div className="flex w-full">
            <input
                value={selectedOption ? selectedOption.nombre : ''}
                onClick={openOption}
                onBlur={() => {
                    setOpenSelect(false);
                }}
                id="league"
                type="text"
                className="h-9 px-2 rounded-s-md w-[90%] bg-border-dark placeholder:text-gray-400 text-white outline-none"
                placeholder={placeHolder}
                readOnly
            />
            <div
                tabIndex={0}
                onBlur={() => {
                    setOpenSelect(false);
                }}
            >
                <MdKeyboardArrowDown size={22} color="#fff" className="bg-border-dark h-9 rounded-e-md"
                    onClick={openOption}
                />
            </div>
            <div className={openselect ? "absolute w-[42%] py-2 visible translate-y-10 max-h-28 overflow-visible opacity-100 bg-panel-dark z-10 px-2 overflow-y-auto rounded-md" : "absolute w-full max-h-28 bg-yellow-700 rounded-sm top-full hidden -translate-y-10 overflow-hidden overflow-y-auto transition text-yellow-500"}>
                {options.map((item, index) => (
                    <li onMouseDown={() => selectvalue(item)} key={index} className="z-20 list-none text-white hover:bg-sub-dark px-2 py-1 rounded-md">
                        {item.nombre}
                    </li>
                ))}
            </div >
        </div>
    );
}

SelectInput.propTypes = {
    options: PropTypes.node.isRequired,
    placeHolder: PropTypes.node.isRequired,
    onSelectOption: PropTypes.node.isRequired,
    value: PropTypes.node,
};