import { useContext, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/notesList/NotesList';
import SearchBar from '../components/searchBar/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import { localeContext } from '../context/LocaleContext';
import Loading from '../components/loading/Loading';

export default function ArchivePage() {
    const { selectLanguage } = useContext(localeContext);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        getArchivedNotes().then(({ data }) => {
            setNotes(data);
        }).finally(() => setLoading(false));

        return () => setLoading(true);
    }, [getArchivedNotes]);

    const filteredNotes = useMemo(() => {
        return search.length > 0 ?
        notes.filter(({ title }) => {
            return title.toLowerCase().includes(search.toLowerCase())
        })
        : notes
    }, [search, notes]);

    if(loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <section className='section_default'>
                <h2>{selectLanguage({ id: 'Catatan Arsip', en: 'Archive Note'})}</h2>
                <SearchBar />
            </section>
            <section className='section_default'>
                <NotesList notes={filteredNotes}/>
            </section>
        </>
    );
}