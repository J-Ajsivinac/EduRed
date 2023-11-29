import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import { PiChatCircleDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom'
export function CardPub({ userName, title, date, content, about }) {
    return (
        <div className='flex w-3/5 bg-panel-dark p-4 rounded-lg flex-col gap-4 text-white'>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <div className='flex flex-row gap-4 items-center'>
                    <UserIcon userName={userName} />
                    <div className='flex flex-col'>
                        <span>{userName}</span>
                        <small className='font-normal'>{date}</small>
                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center flex-nowrap'>
                    <span title={about} className='ease-in-out delay-150 px-4 py-1 border border-red-200 rounded-xl max-w-[200px] text-ellipsis overflow-hidden truncate transition hover:max-w-fit hover:duration-300'>{about}</span>
                </div>
            </div>
            <span className='font-bold'>{title}</span>
            <div>
                <p>{content}</p>
            </div>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <Link className='flex flex-row gap-2 px-2 py-2 items-center hover:bg-sub-dark rounded-md transition-all'><PiChatCircleDuotone size={22} />Comentarios: 2</Link>
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
};