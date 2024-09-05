import { useInput } from '../../hooks/useInput';
import PropTypes from 'prop-types';
import styles from './loginRegisterInput.module.css';
import { useContext } from 'react';
import { localeContext } from '../../context/LocaleContext';

export default function RegisterInput({ register }) {
    const { selectLanguage } = useContext(localeContext);
    const [name, setName] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [confirmPassword, setConfirmPassword] = useInput('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            return alert(`Password doesn't match with confirm password`);
        }

        register({
            name,
            email,
            password
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={styles.form_container}>
                <label htmlFor='name'>{selectLanguage({ id: 'Nama', en: 'Name' })}</label>
                <input
                    type='text'
                    name='name'
                    placeholder={selectLanguage({ id: 'namamu', en: 'your name...'})}
                    value={name}
                    onChange={setName}
                />
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
                <label htmlFor='setPassword'>{selectLanguage({ id: 'Konfirmasi Kata Sandi', en: 'Confirm Password' })}</label>
                <input
                    type='password'
                    name='setPassword'
                    placeholder={selectLanguage({ id: 'konfirmasi kata sandimu...', en: 'confirm your password...' })}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                <button type='submit'>{selectLanguage({ id: 'Daftar', en: 'Sign Up' })}</button>
            </div>
        </form>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
};