import React, { createContext, useContext, useState } from 'react';
import { StudentApi } from '../Services/Api/Student/Student';

export const StudentStateContext = createContext({
    user: {},
    setUser: () => { },
    login: () => { },
    authenticated: false,
    logout: () => { },
    setAuthenticated: () => { },
});

export default function StudentContext({ children }) {
    const [user, setUser] = useState(null);
    const [authenticated, _setAuthenticated] = useState(
        localStorage.getItem('AUTHENTICATED') === 'true'
    );

    const login = async (email, password) => {
        await StudentApi.getCsrfToken();
        return StudentApi.login(email, password);
    };

    const logout = async () => {
        setUser({});
        setAuthenticated(false);
        localStorage.setItem('AUTHENTICATED', 'false');
    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        localStorage.setItem('AUTHENTICATED', isAuthenticated);
    };

    return (
        <StudentStateContext.Provider value={{ user, login, logout, authenticated, setAuthenticated, setUser }}>
            {children}
        </StudentStateContext.Provider>
    );
}

export const useUserContext = () => useContext(StudentStateContext);
