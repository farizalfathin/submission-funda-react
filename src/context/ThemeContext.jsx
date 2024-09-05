import { createContext, useEffect, useState, useMemo } from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = (value) => {
        setTheme(() => {
          const newTheme = value ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return newTheme;
        });
    };

    const themeContextValue = useMemo(() => {
        return {
            theme,
            toggleTheme
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
}