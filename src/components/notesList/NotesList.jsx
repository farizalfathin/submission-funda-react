import NoteItem from '../noteItem/NoteItem';
import PropTypes from 'prop-types';
import styles from './notesList.module.css';
import { useContext } from 'react';
import { localeContext } from '../../context/LocaleContext';

export default function NotesList({ notes = [] }) {
    const { selectLanguage } = useContext(localeContext);

    return notes.length > 0 ? (
        <div className={styles.notes_list}>
            { notes.map(({ id, title, body, createdAt }) => (
                <NoteItem key={id} id={id} title={title} body={body} createad={createdAt}/>
            ))}
        </div>
    ) : (
        <h2 className={styles.notes_not_found}>{selectLanguage({ id: 'Tidak Ada Catatan', en: `There's No Note` })}</h2>
    )
}

NotesList.propTypes = {
    notes: PropTypes.array,
};