import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import Modal from '../modal/Modal'
export function Navbar({ userName }) {
    return (
        <nav className="bg-panel-dark my-3 mx-6 flex justify-between py-4 px-10 rounded-lg text-white items-center">
            <h1 className="text-xl font-bold">
                EduRed
            </h1>
            <div className='flex gap-x-4 w-2/3'>
                <Modal />
                <label className="relative block w-full">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </span>
                    <input className="placeholder:italic w-full placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-zinc-700" placeholder="Search for anything..." type="text" name="search" />
                </label>
            </div>
            <ul className="flex gap-x-2 items-center">
                <UserIcon userName={userName} />
                <li>{userName}</li>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    userName: PropTypes.node.isRequired,
};