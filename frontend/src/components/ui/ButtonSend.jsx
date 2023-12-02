import PropTypes from 'prop-types';

export function ButtonSend({ text }) {
    return (
        <button type="submit" className="px-5 bg-blue-600 py-1 rounded-md text-white hover:bg-blue-700 transition-transform hover:transition-all ease-in-out duration-150">{text}</button>
    )
}

ButtonSend.propTypes = {
    text: PropTypes.node.isRequired,
};