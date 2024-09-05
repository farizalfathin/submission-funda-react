import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils/index';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import styles from './noteItem.module.css';

export default function NoteItem({ id, title, body, createad }) {
    
    return (
        <div className={styles.note_item} >
            <Link to={`/notes/${id}`}>
                <h3>{parser(title)}</h3>
                <p>{showFormattedDate(createad)}</p>
                <p>{parser(body)}</p>
            </Link>
        </div>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createad: PropTypes.string.isRequired
};