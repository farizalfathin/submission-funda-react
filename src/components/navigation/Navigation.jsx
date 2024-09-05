import { Link, useLocation } from 'react-router-dom';
import styles from './navigation.module.css';
import { MdOutlineArchive, MdOutlineUnarchive, MdOutlineLanguage } from 'react-icons/md';
import { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { MdDarkMode } from 'react-icons/md';
import { localeContext } from '../../context/LocaleContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navigation({ user, logout }) {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>
                <div className={styles.logo}>
                    <img src='/logo.png' alt='logo' />
                    <h1>Catat</h1>
                </div>
            </Link>
            <div className={styles.nav_group}>
            { location.pathname !== '/archives'
            ? (
                <Link to={'/archives'}>
                    <div className={styles.button_nav}>
                        <span>
                            <MdOutlineArchive />
                        </span>
                    </div>
                </Link>
            ) : (
                <Link to={'/'}>
                    <div className={styles.button_nav}>
                        <span>
                            <MdOutlineUnarchive />
                        </span>
                    </div>
                </Link>
            )}
                <Hamburger user={user} logout={logout}/>
            </div>
        </nav>
    )
}

function Hamburger({ user, logout }) {
    const { selectLanguage, toggleLocale } = useContext(localeContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.hamburgerContainer}>
            <div className={styles.button_nav} onClick={toggleMenu}>
                <span>
                    <FaRegUserCircle />
                </span>
            </div>
            <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
                <div className={styles.profile}>
                    <CgProfile />
                    <p>{user}</p>
                </div>
                <div className={styles.button_group}>
                    <p><MdDarkMode /> {selectLanguage({ id: 'Mode Gelap', en: 'Dark Mode' })}</p>
                    <Toggle />
                </div>
                <div className={styles.button_group}>
                    <p><MdOutlineLanguage /> {selectLanguage({ id: 'Bahasa', en: 'Language' })}</p>
                    <select onChange={({ target }) => toggleLocale(target.value)}>
                        <option value='id' >
                            {selectLanguage({ id: 'Indonesia', en: 'Indonesian' })}
                        </option>
                        <option value='en'>
                            {selectLanguage({ id: 'Inggris', en: 'English' })}
                        </option>
                    </select>
                </div>
                <button type='button' onClick={logout}><FiLogOut /> {selectLanguage({ id: 'Keluar', en: 'Logout' })}</button>
            </div>
        </div>
    );
}

function Toggle() {
    const checkedRef = useRef(null);
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <label className={styles.switch}>
            <input type='checkbox' ref={checkedRef} onChange={() => toggleTheme(checkedRef.current.checked)} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}

Navigation.propTypes = {
    user: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

Hamburger.propTypes = {
    user: PropTypes.string,
    logout: PropTypes.func.isRequired
}