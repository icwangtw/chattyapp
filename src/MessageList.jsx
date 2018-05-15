import React from 'react';
import Message from "./Message.jsx"

class MessageList extends React.Component {
  render () {
    const allMessages = this.props.messages.map ((message) => {
      return (
        <Message key ={message.id} eachMessage = {message} />
      )
  })
    return (
      <main className="messages">
        {allMessages}
      </main>
    )
  }
}

export default MessageList

