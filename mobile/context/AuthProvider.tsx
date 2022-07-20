import React, {useContext} from 'react'
import {createContext, useState, useReducer}  from "react";

const AuthContext = createContext(false)



const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
    )
}


export const useLogin = () => useContext(AuthContext)

export default AuthProvider