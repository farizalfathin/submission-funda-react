import PropTypes from 'prop-types';
import styles from './noteInput.module.css';
import ContentEditable from 'react-contenteditable';
import { useContext, useRef } from 'react';
import { localeContext } from '../../context/LocaleContext';

export default function NoteInput({ state, onTitleChange, onBodyChange, disabled }) {
  const { selectLanguage } = useContext(localeContext);
  const contentEditAbleRefTitle = useRef(null);
  const contentEditAbleRefBody = useRef(null);

  const handleTitleChange = (e) => {
    const value = e.target.value.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags
    if (value.length <= 30) {
      onTitleChange(e);
    } else {
      alert(selectLanguage({ id: 'Maksimum panjang judul adalah 30 karakter', en: 'Maximum title length is 30 characters' }));
      contentEditAbleRefTitle.current.innerHTML = value.substring(0, 30);
    }
  };
  
    return (
      <div className={styles.note_input}>
        <ContentEditable
          innerRef={contentEditAbleRefTitle}
          data-placeholder={selectLanguage({ id: 'Catatan Rahasia', en: 'Secret Note' })}
          onChange={handleTitleChange}
          html={state.title || ''}
          disabled={disabled}
          tagName='p'
        />
        <ContentEditable
            innerRef={contentEditAbleRefBody}
            disabled={disabled}
            html={state.body || ''}
            data-placeholder={selectLanguage({ id: 'Sebenarnya saya adalah Superman....', en: `Actually I'm a Superman....`})}
            onChange={onBodyChange}
            tagName='p'
        />
      </div>
    );
  }

NoteInput.propTypes = {
    state: PropTypes.object.isRequired,
    onTitleChange: PropTypes.func,
    onBodyChange: PropTypes.func,
    disabled: PropTypes.bool
};
