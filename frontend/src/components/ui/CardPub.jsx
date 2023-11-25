import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'

export function CardPub({ userName, title, date, content }) {
    return (
        <div className='flex w-3/5 bg-slate-300 p-4 rounded-lg flex-col gap-4'>
            <div className="flex w-full flex-row  items-center gap-4">
                <UserIcon userName={userName} />
                <div className='flex flex-col'>
                    <small>{userName}</small>
                    <span className='font-bold'>{title}  <small className='font-normal'>| {date}</small></span>
                </div>
            </div>
            <div>
                <p>{content}</p>
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