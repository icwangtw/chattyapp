import React from 'react';

class Message extends React.Component {
  render () {
    const {id, username, content, type} = this.props.eachMessage;
    const imageMatch = /^http.*(\.jpg$|\.png$|\.gif$)/i;
    return (
      <div>
        {type === "msg" ?
          <div className="message">
          <span className="message-username">{username}</span>
          {imageMatch.test(content) ?
            <div className="message-content"><img src = {content}/></div>
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

