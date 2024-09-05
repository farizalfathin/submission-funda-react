import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NotesList from '../components/notesList/NotesList';
import SearchBar from '../components/searchBar/SearchBar';
import Button from '../components/button/Button';
import { FiPlus } from 'react-icons/fi';
import { getActiveNotes } from '../utils/network-data';
import { localeContext } from '../context/LocaleContext';
import Loading from '../components/loading/Loading';

export default function HomePage() {
    const navigate = useNavigate();
    const { selectLanguage } = useContext(localeContext);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setNotes(data);
        }).finally(() => setLoading(false));

        return () => setLoading(true);
    }, [getActiveNotes]);

    const filteredNotes = useMemo(() => {
        return search.length > 0 ?
        notes.filter(({ title }) => {
            return title.toLowerCase().includes(search.toLowerCase())
        })
        : notes
    }, [search, notes]);

    if(loading) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <>
            <section className='section_default'>
                <h2>{selectLanguage({ id: 'Catatan Aktif', en: 'Active Note' })}</h2>
                <SearchBar />
            </section>
            <section className='section_default'>
                <NotesList notes={filteredNotes}/>
            </section>
            <div className='floating_button_group'>
                <Button title='Add' onClick={() => navigate('/notes/new')} icon={<FiPlus />}/>
            </div>
        </>
    );
}