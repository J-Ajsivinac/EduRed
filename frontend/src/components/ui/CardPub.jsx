import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'
import { PiChatCircleDuotone } from "react-icons/pi";
export function CardPub({ userName, title, date, content }) {
    return (
        <div className='flex w-3/5 bg-panel-dark p-4 rounded-lg flex-col gap-4 text-white'>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <div className='flex flex-row gap-4 items-center'>
                    <UserIcon userName={userName} />
                    <div className='flex flex-col'>
                        <small>{userName}</small>
                        <span className='font-bold'>{title}</span>
                    </div>
                </div>
                <small className='font-normal'>{date}</small>
            </div>
            <div>
                <p>{content}</p>
            </div>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <button className='flex flex-row gap-2 px-2 py-2 items-center hover:bg-sub-dark rounded-md transition-all'><PiChatCircleDuotone size={22} />Comentarios: 2</button>
            </div>
        </div>
    )
}

CardPub.propTypes = {
    userName: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    date: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
};