import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        return sessionStorage.getItem('token');
    };

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const [token, setToken] = useState();

    return {
        getToken: getToken,
        setToken: saveToken,
        token
    }
}