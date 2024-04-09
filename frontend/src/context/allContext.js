import React,{ useContext,createContext,useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState(null);
    const [linkedin,setLinkedin] = useState('');
    const [skills,setSkills] = useState([]);
    const [recommskills,setRecommskills] = useState([]);
    const [tips,setTips] = useState([]);

    return (
        <UserContext.Provider value={{name,setName,email,setEmail,phone,setPhone,linkedin,setLinkedin,skills,setSkills,recommskills,setRecommskills,tips,setTips}}>
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