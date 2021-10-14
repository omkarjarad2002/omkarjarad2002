import React from 'react'
import { ListGroup} from 'react-bootstrap';
import { useContacts } from './ContactsProvider'

export default function Contacts() {
    const {Contacts} = useContacts();


    return (
        <ListGroup variant="flush" >
            {Contacts.map(Contacts =>(
                <ListGroup.Item key={Contacts.id} >
                    {Contacts.name}
                </ListGroup.Item> 
            ))}
        </ListGroup>
    )
}
