import React,{ useContext,createContext,useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    return (
        <UserContext.Provider value={{name,setName,email,setEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context =useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
}