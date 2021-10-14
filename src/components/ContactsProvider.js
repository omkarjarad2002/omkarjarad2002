import React, {useContext} from 'react'
import useLocalstorage from '../hooks/useLocalStorage';
import Contacts from './Contacts';

const ContactsContext = React.createContext()

export function useContacts(){
    return useContext(ContactsContext);
}


export function ContactsProvider({children}) {
    const [Contacts, setContacts] = useLocalstorage("Contacts", []);

    function createContact(id , name){
        setContacts(prevContacts=>{
            return [...prevContacts, {id,name}]
        })
    }
    return (
        <ContactsContext.Provider value={{Contacts , createContact}} >
            {children}
        </ContactsContext.Provider>
    )
}
