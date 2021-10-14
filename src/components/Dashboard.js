import React from 'react'
import { useConversations } from './ConversationsProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

export default function Dashboard({id}) {
    const { selectedConversations } = useConversations();
    return (
        <div className="d-flex" style={{height : '100vh'}} >
        <Sidebar id = {id} />
        { selectedConversations && <OpenConversation />}
        </div>
    )
}
