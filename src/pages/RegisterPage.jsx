import { useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import { Link } from 'react-router-dom';
import RegisterInput from '../components/loginRegisterInput/RegisterInput';
import { useContext } from 'react';
import { localeContext } from '../context/LocaleContext';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { selectLanguage } = useContext(localeContext);
    
    const onRegister = async (user) => {
        const { error, message } = await register(user);

        if(!error) {
            alert('User registered successfully');
            navigate('/');
        }
    }

    return (
        <>
            <section className='section_default register_sec'>
                <h2>{selectLanguage({ id: 'Isi formulir untuk daftarkan akunmu', en: 'Fill the form to regist your account.' })}</h2>
                <RegisterInput register={onRegister} />
                <p>{selectLanguage({ id: 'Sudah miliki akun?', en: 'Already have an account?' })} <Link to='/'>{selectLanguage({ id: 'Masuk', en: 'Login' })}</Link></p>
            </section>
        </>
    );
}