import PropTypes from 'prop-types';
import { UserIcon } from './UserIcon'

export function CardCreate({ userName }) {
    return (
        <div className='flex w-3/5 bg-slate-300 p-3 rounded-lg'>
            <div className="flex w-full flex-row  items-center gap-4">
                <UserIcon userName={userName} />
                <textarea name="" id="" className='resize-none w-full rounded-lg px-4 py-2'></textarea>
            </div>
        </div>
    )
}

CardCreate.propTypes = {
    userName: PropTypes.node.isRequired,
};