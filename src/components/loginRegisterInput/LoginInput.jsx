import { useInput } from '../../hooks/useInput';
import PropTypes from 'prop-types';
import styles from './loginRegisterInput.module.css';
import { useContext } from 'react';
import { localeContext } from '../../context/LocaleContext';

export default function LoginInput({ login }) {
    const { selectLanguage } = useContext(localeContext);
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const onSubmit = (e) => {
        e.preventDefault();

        login({
            email, password
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={styles.form_container}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    placeholder={selectLanguage({ id: 'emailmu...', en: 'your email...' })}
                    value={email}
                    onChange={setEmail}
                />
                <label htmlFor='password'>{selectLanguage({ id: 'Kata Sandi', en: 'Password' })}</label>
                <input
                    type='password'
                    name='password'
                    placeholder={selectLanguage({ id: 'kata sandimu...', en: 'your password...' })}
                    value={password}
                    onChange={setPassword}
                />
                <button type='submit'>{selectLanguage({ id: 'Masuk', en: 'Login' })}</button>
            </div>
        </form>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
};