import { useState } from "react";
import PropTypes from 'prop-types';
import './scroll.css'

export function SelectInput({ options, placeHolder }) {

    const [openselect, setOpenSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function selectvalue(option) {
        console.log(option)
        setSelectedOption(option);
        setOpenSelect(false);
    }

    function openOption() {
        setOpenSelect(true);
    }
    return (
        <>
            <input
                value={selectedOption}
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
                        {item}
                    </li>
                ))}
            </div >
        </>
    );
}

SelectInput.propTypes = {
    options: PropTypes.node.isRequired,
    placeHolder: PropTypes.node.isRequired,
};