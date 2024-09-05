import { useSearchParams } from 'react-router-dom';
import styles from './searchBar.module.css';
import { useContext } from 'react';
import { localeContext } from '../../context/LocaleContext';

export default function SearchBar() {
    const { selectLanguage } = useContext(localeContext);
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={styles.search_bar}>
            <input
              type='text'
              placeholder={selectLanguage({ id: 'Cari berdasarkan judul.....', en: 'Search based on title.....' })}
              value={searchParams.get('search') || ''}
              onChange={({ target }) => {
                setSearchParams({ search: target.value })
              }}
            />
        </div>
    );
}