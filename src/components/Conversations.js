import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from './ConversationsProvider';

export default function 
() {
    const {Conversations, selectedConversationIndex} = useConversations();
    return (

        <ListGroup variant="flush" >
        { Conversations.map(( Conversations , index ) =>(
            <ListGroup.Item 
            key={index}
            action
            onClick={()=>selectedConversationIndex(index)}
            active = {Conversations.selected}
            >
                {Conversations.recipients.map(r => r.name).join(", ")}
            </ListGroup.Item> 
        ))}
        </ListGroup>
    )
}
