import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { localeContext } from '../context/LocaleContext';

export default function PageNotFound() {
    const { selectLanguage } = useContext(localeContext);

    return (
        <div className='not_found'>
            <h1>404</h1>
            <h3>{selectLanguage({ id: 'Halaman tidak ditemukan', en: 'Page Not Found' })}</h3>
            <Link to={'/'}>{selectLanguage({ id: 'Pergi ke halaman utama', en: 'Go Home' })}</Link>
        </div>
    )
}