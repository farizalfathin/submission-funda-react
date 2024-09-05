import { createContext, useMemo, useState } from 'react';

export const localeContext = createContext();

export const LocaleContextProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

    const toggleLocale = (value) => {
        setLocale(() => {
          const newLocale = value === 'id' ? 'id' : 'en';
          localStorage.setItem('locale', newLocale);
          return newLocale;
        });
    };

    const selectLanguage = ({ id, en }) => {
        if (id === undefined || en === undefined) {
          return 'language options is empty';
        }
        return locale === 'id' ? id : en;
    };

    const localeContextValue = useMemo(() => {
        return {
            locale,
            toggleLocale,
            selectLanguage
        }
    }, [locale]);

    return (
        <localeContext.Provider value={localeContextValue}>
            {children}
        </localeContext.Provider>
    );
}