import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Modal() {
    const [modal, setModal] = useState(false);

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
            <button onClick={toggleModal} className='flex flex-row items-center border-2 border-border-dark py-1 px-2 rounded-md w-36 justify-between '>
                <span>Filtrar</span>
                <MdKeyboardArrowDown size={22} />
            </button>

            {modal && (
                <div className="w-full h-full top-0 left-0 right-0 bottom-0 fixed z-10">
                    <div onClick={toggleModal} className="w-full h-full top-0 left-0 right-0 bottom-0 fixed"></div>
                    <div className="absolute top-20 left-[20%]  py-3 px-3 max-w-[400px] min bg-sub-dark rounded-md">
                        <h2>Hello Modal</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                            perferendis suscipit officia recusandae, eveniet quaerat assumenda
                            id fugit, dignissimos maxime non natus placeat illo iusto!
                        </p>
                        <button className="absolute top-2 right-2 px-2 py-1" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}