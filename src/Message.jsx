import React from 'react';

class Message extends React.Component {
  render () {
    const {id, username, content, type} = this.props.eachMessage;
    const imageMatch = /(jpg$|png$|gif$)/;
    return (
      <div>
        {type === "msg" ?
          <div className="message">
          <span className="message-username">{username}</span>
          {imageMatch.test(content) ?
            <img src = {content}/>
            :
            <span className="message-content">{content}</span>
          }
          </div>
        :
          <div className="message system">{content}</div>
        }
      </div>
    )
  }
}

export default Message

