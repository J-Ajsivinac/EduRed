import PropTypes from 'prop-types';

export function UserIcon({ userName }) {
    return (
        <div className='flex items-center justify-center w-8 h-8 bg-[#e3f3ff] rounded-full text-black font-bold'>
            <span className='text-[#32343e]'>{userName[0]}</span>

        </div>
    )
}

UserIcon.propTypes = {
    userName: PropTypes.node,
};