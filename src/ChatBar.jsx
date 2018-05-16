import React from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props)
    this.onPost = this.onPost.bind(this)
  }
  onPost(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.onNewPost(event.target.value);
      event.target.value = "";
    }
  }

  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value = {this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown= {this.onPost} />
      </footer>
    )
  }
}

export default ChatBar

