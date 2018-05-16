import React from 'react';

class Message extends React.Component {
  render () {
    return (
      <div>
        {this.props.eachMessage.username ?
          <div className="message">
          <span className="message-username">{this.props.eachMessage.username}</span>
          <span className="message-content">{this.props.eachMessage.content}</span>
          </div>
        :
          <div className="message system">{this.props.eachMessage.content}</div>
        }
      </div>
    )
  }
}

export default Message

