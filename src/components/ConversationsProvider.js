import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalstorage from '../hooks/useLocalStorage';
import {useContacts} from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext);
}

export function ConversationsProvider({id,children}) {
    const [Conversations, setConversations] = useLocalstorage('Conversations', []);
    const [selectedConversationIndex , setSelectedConversationIndex] = 
    useState(0);
    const { Contacts } = useContacts();
    const socket = useSocket();

    function createConversation(recipients){
        setConversations(prevConversations=>{
            return [...prevConversations, { recipients , messages : [] } ]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender })=>{
        setConversations(prevConversations =>{
            let madeChange = false;
            const newMessage = {sender, text};
            
            const newConversations = prevConversations.map(
                Conversation=>{
                    if(arrayEquality(Conversation.recipients, recipients)){
                        madeChange=true;
                        return{ 
                        ...Conversation,
                        messages : [...Conversation.messages, newMessage]
                        }
                    }
                    return Conversation
                }
            )
            if (madeChange) {
                return newConversations
            }else{
                return [...prevConversations,{recipients, messages : [newMessage]}
            ]
            }
        })
    },[setConversations])

    useEffect(() => {
        if(socket == null) return 
        socket.on('receive-message', addMessageToConversation)

        return ()=> socket.off('receive-message')
        
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, text){
        socket.emit('send-message' , {recipients, text})

        addMessageToConversation({ recipients, text, sender:id })
    }

    const formattedConversations = Conversations.map((Conversation, index)=>{
        const recipients = Conversation.recipients.map(recipient=>{
            const contact = Contacts.find(contact=>{
                return contact.id == recipient
            })

            const name = (contact && contact.name) || recipient
            return { id : recipient, name}
        })

        
        const messages = Conversation.messages.map(messages=>{
            const contact = Contacts.find(contact=>{
                return contact.id === messages.sender
            })

            const name = (contact && contact.name) || messages.sender
            const fromMe = id === messages.sender
            return {...messages , senderName : name, fromMe}
        })

        const selected = index === selectedConversationIndex;
        return { ...Conversation, messages, recipients, selected}
    })

    const value = {
        Conversations : formattedConversations,
        selectedConversations : formattedConversations
        [selectedConversationIndex],
        sendMessage,
        selectedConversationIndex : setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value} >
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b){
    if(a.length !== b.length){
        return false
    }

    a.sort();
    b.sort();

    return a.every((element, index)=>{
        return element === b[index];
    })

}