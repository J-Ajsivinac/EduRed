import PropTypes from 'prop-types';
import { PiBookBookmarkDuotone } from "react-icons/pi";

export function Item({ name, number }) {
    return (
        <div className='w-full flex flex-row px-6 py-3 justify-between rounded-lg hover:bg-sub-dark transition-transform hover:transition-all ease-in-out duration-150'>
            <div className='flex flex-row gap-4'>
                <PiBookBookmarkDuotone size={24} color='#edc679' />
                <span className='font-medium '>{name}</span>
            </div>
            <span className='w-7'>{number}</span>
        </div>
    )
}

Item.propTypes = {
    name: PropTypes.node,
    number: PropTypes.node,
};