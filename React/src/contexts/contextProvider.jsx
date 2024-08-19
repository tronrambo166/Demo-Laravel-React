import { useContext } from "react";
import { useState } from 'react'
import { createContext } from 'react'

const StateContext = createContext({
	user:null,
	token:null,
    auth:null,
    setAuth: () => {},
	setUser: () => {},
	setToken: () => {}
});

export const ContextProvider = ({children}) => {
	const [user, setUser] = useState({});
	const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [auth, setAuth] = useState({});
	//const [token, setToken] = useState({});

	const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
            
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            setAuth,
            auth
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)