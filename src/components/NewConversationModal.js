import React,{ useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useContacts } from './ContactsProvider';
import { useConversations } from './ConversationsProvider';

export default function NewConversationsModal({closeModal}) {

    const[selectedContactIds, setSelectedContactIds] = useState([]);
    const { Contacts } = useContacts();
    const { createConversation } = useConversations();

    function handleSubmit(e){
        e.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(ContactId){
        setSelectedContactIds(prevSelectedContactIds =>{
            if(prevSelectedContactIds.includes(ContactId)){
                return prevSelectedContactIds.filter(prevId=>{
                    return prevSelectedContactIds !== prevId
                })
            }else{
                return [...prevSelectedContactIds, ContactId]
            }
        })
    }
    
    return (
        <>
            <Modal.Header closeButton>Create Conversations</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                {Contacts.map(Contacts=>(
                    <Form.Group controlId={Contacts.id} key={Contacts.id} >

                        <Form.Check
                        type="checkbox"
                        value={(selectedContactIds.includes(Contacts.id))}
                        label={Contacts.name} 
                        onChange={()=>{handleCheckboxChange(Contacts.id)}} />

                    </Form.Group>
                ))}
                <Button type="submit" >Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
