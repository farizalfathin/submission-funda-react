import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/noteInput/NoteInput';
import Button from '../components/button/Button';
import { FiCheck } from 'react-icons/fi';
import { addNote } from '../utils/network-data';
import { localeContext } from '../context/LocaleContext';

export default function AddPage() {
    const navigate = useNavigate();
    const { selectLanguage } = useContext(localeContext);
    const [newNote, setNewNote] = useState({ title: '', body: '' });

    const onTitleChange = (e) => {
        console.log(e.target.value);
        setNewNote((prevData) => ({
            ...prevData,
            title: e.target.value
        }));
    };

    const onBodyChange = (e) => {
        setNewNote((prevData) => {
            return {
                ...prevData,
                body: e.target.value
            }
        });
    }

    const onSaveNote = async () => {
        if (newNote.title && newNote.body) {
            await addNote(newNote);
            navigate('/');
        } else {
            alert(selectLanguage({ id: 'Judul dan isi keduanya wajib diisi', en: 'Both title and body are required'}));
        }
    }

    return (
        <>
            <section className='section_default'>
                <NoteInput
                    state={newNote}
                    onTitleChange={onTitleChange}
                    onBodyChange={onBodyChange}
                />
            </section>
            <div className='floating_button_group'>
                <Button title='Add' onClick={onSaveNote} icon={<FiCheck />}/>
            </div>
        </>
    );
}
