import PropTypes from 'prop-types';

export function UserIcon({ userName }) {
    return (
        <div className='flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full text-black font-bold'>
            {userName[0]}
        </div>
    )
}

UserIcon.propTypes = {
    userName: PropTypes.node.isRequired,
};