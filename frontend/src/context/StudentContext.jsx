import { createContext, useContext, useState } from 'react';
import { UserApi } from '../Services/Api/UserApi';

export const StudentStateContext = createContext({
    user: {},
    setUser: () => { },
    login: () => { },
    authenticated: false,
    logout: () => { },
    setAuthenticated: () => { },
    setToken: () => { },

});

export default function StudentContext({ children }) {
    const [user, setUser] = useState(null);
    const [authenticated, _setAuthenticated] = useState(
        localStorage.getItem('AUTHENTICATED') === 'true'
    );

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token && authenticated) {
    //         UserApi.getProfile().then((res) => {
    //             setUser(res.data?.user || null);
    //         }).catch(() => {
    //             logout(); // token expired or invalid
    //         });
    //     }
    // }, [authenticated]);

    const login = async (email, password) => {
        // await UserApi.getCsrfToken();
        return UserApi.login(email, password);
    };

    const logout = async () => {
        setUser({});
        setAuthenticated(false);
        localStorage.setItem('AUTHENTICATED', 'false');
        localStorage.removeItem('token'); // 🔐 Optional: clear token on logout

    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        localStorage.setItem('AUTHENTICATED', isAuthenticated);
    };

    const setToken = (token) => {
        window.localStorage.setItem('token', token)
    }

    return (
        <StudentStateContext.Provider value={{ user, login, logout, authenticated, setAuthenticated, setUser, setToken }}>
            {children}
        </StudentStateContext.Provider>
    );
}

export const useUserContext = () => useContext(StudentStateContext);
