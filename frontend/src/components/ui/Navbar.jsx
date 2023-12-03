import PropTypes from 'prop-types';
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { Account } from './Account'
import Modal from '../modal/Modal'
export function Navbar({ userName }) {
    console.log(userName)
    return (
        <nav className="fixed top-0 w-full bg-panel-dark flex justify-between py-4 px-10 rounded-lg text-white items-center">
            <Link to="/init" className="text-xl font-bold">
                EduRed
            </Link>
            <div className='flex gap-x-4 w-2/3'>
                <Modal />
                <label className="relative block w-full">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        {/* <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg> */}
                        <PiMagnifyingGlassFill size={20} />
                    </span>
                    <input className="placeholder:italic w-full placeholder:text-gray-400 block bg-sub-dark rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-border-dark focus:ring-sky-700 focus:ring-1 sm:text-sm hover:bg-border-dark transition-transform hover:transition-all ease-in-out duration-150" placeholder="Busacar Usuarios..." type="text" name="search" />
                </label>
            </div>
            <ul className="flex gap-x-2 items-center">
                <Account />
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    userName: PropTypes.node.isRequired,
};