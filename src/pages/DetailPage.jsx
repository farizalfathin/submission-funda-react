import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteInput from '../components/noteInput/NoteInput';
import Button from '../components/button/Button';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';

export default function EditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [noteValue, setNoteValue] = useState({});

    useEffect(() => {
        const fetchNoteDetail = async () => {
            const { data } = await getNote(id);
            setNoteValue(data);
        }

        fetchNoteDetail();
    }, [id]);

    const onArchiveNote = async () => {
        await archiveNote(id);
        navigate('/');
    }

    const onUnArchiveNote = async () => {
        await unarchiveNote(id);
        navigate('/archives');
    }

    const onDeleteNote = async () => {
        await deleteNote(id);
        if(noteValue.archived) {
            navigate('/archives');
        } else {
            navigate('/');
        }
    }

    return (
        <>
            <section className='section_default'>
                <NoteInput
                    state={noteValue}
                    disabled
                />
            </section>
            <div className='floating_button_group'>
                <Button title='Delete' onClick={onDeleteNote} icon={<FiTrash />}/>
                { noteValue.archived
                    ? <Button title='Unarchive' onClick={onUnArchiveNote} icon={<MdOutlineUnarchive />}/>
                    : <Button title='Archive' onClick={onArchiveNote} icon={<MdOutlineArchive />}/>
                }
            </div>
        </>
    );
}