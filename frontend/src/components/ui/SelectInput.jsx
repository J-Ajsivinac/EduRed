import { useState } from "react";
import PropTypes from 'prop-types';


export function SelectInput({ options, placeHolder }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function selectValue(option) {
        setSelectedOption(option);
        setIsOpen(false);
    }

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <input
                value={selectedOption}
                onClick={toggleOpen}
                onBlur={() => setIsOpen(false)}
                placeholder={placeHolder}
                readOnly
            />

            {isOpen && (
                <div className="absolute w-full max-h-36 bg-yellow-700 rounded-sm top-full -translate-y-10 overflow-hidden overflow-y-auto transition text-yellow-500">
                    {options.map((item, index) => (
                        <li onMouseDown={() => selectValue(item)} key={index} className="z-20 bg-slate-400">
                            {item}
                        </li>
                    ))}
                </div>
            )}
        </>
    );
}

SelectInput.propTypes = {
    options: PropTypes.node.isRequired,
    placeHolder: PropTypes.node.isRequired,
};