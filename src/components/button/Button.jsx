import PropTypes from 'prop-types';
import styles from './button.module.css';

export default function Button({ title, onClick, icon}) {
    return (
        <button className={styles.button} title={title} onClick={onClick}>
            {icon}
        </button>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.object.isRequired
};