import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import { PiChatCircleDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom'
export function CardPub({ userName, title, date, content, about, number }) {
    return (
        <div className='border-2 border-panel-dark flex w-3/5 bg-panel-dark py-4 px-6 rounded-lg flex-col gap-4 text-white  hover:border-border-dark transition-transform hover:transition-all ease-in-out duration-150'>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <div className='flex flex-row gap-4 items-center'>
                    <UserIcon userName={userName} />
                    <div className='flex flex-col'>
                        <span>{userName}</span>
                        <small className='font-normal'>{date}</small>
                    </div>
                </div>

            </div>
            <span className='font-bold'>{title}</span>
            <div>
                <p>{content}</p>
            </div>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <Link className='flex flex-row gap-2 px-2 py-2 items-center hover:bg-sub-dark rounded-md transition-all'><PiChatCircleDuotone size={22} />Comentarios: {number}</Link>
                <div className="text-clip truncate overflow-hidden w-fit flex flex-row gap-2">
                    <span className="border-2 border-[#767efa] px-3 py-1 rounded-lg text-gray-300">{about}</span>
                </div>
            </div>
        </div>
    )
}

CardPub.propTypes = {
    userName: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    date: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    about: PropTypes.node.isRequired,
    number: PropTypes.node.isRequired,
};