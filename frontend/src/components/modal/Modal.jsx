import { useState } from "react";

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
            <button onClick={toggleModal} className='flex flex-row items-center gap-x-2 border border-zinc-400 py-1 px-4 rounded-md '>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 18q-.425 0-.713-.288T10 17q0-.425.288-.713T11 16h2q.425 0 .713.288T14 17q0 .425-.288.713T13 18h-2Zm-4-5q-.425 0-.713-.288T6 12q0-.425.288-.713T7 11h10q.425 0 .713.288T18 12q0 .425-.288.713T17 13H7ZM4 8q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z" /></svg>
                Filtrar
            </button>

            {modal && (
                <div className="w-full h-full top-0 left-0 right-0 bottom-0 fixed">
                    <div onClick={toggleModal} className="w-full h-full top-0 left-0 right-0 bottom-0 fixed"></div>
                    <div className="absolute top-20 left-1/4  py-2 px-2 max-w-[400px] min">
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