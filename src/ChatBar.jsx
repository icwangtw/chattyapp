import React from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props)
    this.onPost = this.onPost.bind(this)
    this.userName = this.userName.bind(this)
  }
  onPost(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.onNewPost(event.target.value);
      event.target.value = "";
    }
  }

  userName(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.target.value.length === 0) {
        this.props.onNameSet("Anonymous")
      } else {
        this.props.onNameSet(event.target.value);
      }
    }
  }

  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown= {this.userName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown= {this.onPost} />
      </footer>
    )
  }
}

export default ChatBar

