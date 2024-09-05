import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Navigation from './components/navigation/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import { LocaleContextProvider } from './context/LocaleContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const location = useLocation();
  const [authedUser, setAuthedUser] = useState(null);
  const showHeaderPaths = ['/', '/archives', '/notes/new', /^\/notes\/[^\/]+$/];
  const showHeader = showHeaderPaths.some(path =>
    path instanceof RegExp ? path.test(location.pathname) : path === location.pathname
  );

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  }

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
    });
  }, []);

  if(authedUser) {
    return (
      <ThemeContextProvider >
        <LocaleContextProvider >
          {showHeader && (
            <header>
              <Navigation user={authedUser.name} logout={onLogout} />
            </header>
          )}
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/archives' element={<ArchivePage />} />
              <Route path='/notes/:id' element={<DetailPage />} />
              <Route path='/notes/new' element={<AddPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </main>
        </LocaleContextProvider>
      </ThemeContextProvider>
    );
  }

  return (
    <ThemeContextProvider >
      <LocaleContextProvider >
        <main>
          <Routes>
            <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
      </LocaleContextProvider>
    </ThemeContextProvider>
  );

}

export default App;
