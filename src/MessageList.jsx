import React from 'react';
import Message from "./Message.jsx"

class MessageList extends React.Component {
  render () {
    return (
      <main className="messages">
        <Message />
        <div className="message system">
        Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList
