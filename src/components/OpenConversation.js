import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from './ConversationsProvider';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const lastMessageRef = useRef();
    const setRef = useCallback(node=>{
        if(node){
        node.scrollIntoView({smooth : true})}
    }, []);
    const { sendMessage, selectedConversations } = useConversations();

    function handleSubmit(e){
        e.preventDefault();
 
        sendMessage(selectedConversations.recipients.map(r=>r.id),
        text)
        setText('');
    }
  
    return (
        <div className="d-flex flex-column flex-grow-1" >
            <div className="flex-grow-1 overflow-auto" >
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversations.messages.map((messages, index)=>{
                        const lastMessage = selectedConversations.messages.length - 1 === index ;
                        return(
                            <div
                            ref={lastMessage ? setRef : null}
                            key={index}
                            className={`my-1 d-flex flex-column ${messages.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                <div className={`rounded px-2 py-1 ${messages.fromMe ? 'bg-primary text-white' : 'border'}`} >
                                    {messages.text}
                                </div>
                                <div className={`text-muted small ${messages.fromMe ? 'text-right' : ''}`} >
                                    {messages.fromMe ? 'You' : messages.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit} >
            <Form.Group className="m-2" >
                <InputGroup>
                    <Form.Control
                    as="textarea"
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style= {{height:'75px', resize:'none'}}
                    />
                    <InputGroup.Append>
                    <Button type="submit" style= {{height:'75px', resize:'none'}}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
            </Form>
        </div>
    )
}
