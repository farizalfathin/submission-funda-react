import LoginInput from '../components/loginRegisterInput/LoginInput';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/network-data';
import { useContext } from 'react';
import { localeContext } from '../context/LocaleContext';

export default function LoginPage({ loginSuccess }) {
    const { selectLanguage } = useContext(localeContext);

    const onLogin = async ({ email, password }) => {
        const { error, data } = await login({ email, password});

        if(!error) {
            loginSuccess(data);
            useNavigate('/');
        }
    }

    return (
        <>
            <section className='section_default login_sec'>
                <h2>{selectLanguage({ id: 'Masuk untuk gunakan Catat', en: 'Login to use Catat' })}</h2>
                <LoginInput login={onLogin}/>
                <p>{selectLanguage({ id: 'Tidak memiliki akun?', en: `Don't have an account?` })} <Link to={'/register'}>{selectLanguage({ id: 'daftar', en: 'sign up' })}</Link></p>
            </section>
        </>
    );
}