import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'

export function CardCom({ userName, date, content }) {
    return (
        <div className='border-2 border-sub-dark flex w-3/5 py-4 px-6 rounded-lg flex-col gap-4 text-white  hover:border-border-dark transition-transform hover:transition-all ease-in-out duration-150'>
            <div className="flex w-full flex-row items-center gap-4 justify-between">
                <div className='flex flex-row gap-4 items-center'>
                    <UserIcon userName={userName} />
                    <div className='flex flex-col'>
                        <span>{userName}</span>
                        <small className='font-normal'>{date}</small>
                    </div>
                </div>

            </div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}

CardCom.propTypes = {
    userName: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    date: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    about: PropTypes.node.isRequired,
    number: PropTypes.node.isRequired,
    id: PropTypes.node,
    click: PropTypes.func,
};