import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import { ContactsProvider } from "./ContactsProvider";
import Dashboard from "./Dashboard";
import { ConversationsProvider } from "./ConversationsProvider";
import {SocketProvider} from "./SocketProvider";

function App(e) {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
