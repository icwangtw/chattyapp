import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      { id: 1, username: "Bob", content: "Has anyone seen my marbles?", },
      { id: 2, username: "Anonymous", content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
      ]
    }
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    console.log("connected to server")
    this.socket.onmessage = (event) => {
      const inboundmsg = JSON.parse(event.data)
      const newmessages = this.state.messages.concat(inboundmsg)
      this.setState({messages: newmessages})
      console.log(inboundmsg);
    }
  }

  onNewPost(post) {
    const user = this.state.currentUser.name
    const newMessage = {username: user, content: post};
    this.socket.send(JSON.stringify(newMessage))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser.name} onNewPost = {this.onNewPost}/>
      </div>
    );
  }
}
export default App;
