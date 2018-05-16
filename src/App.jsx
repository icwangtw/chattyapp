import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      { id: 1, username: "Bob", content: "Has anyone seen my marbles?", },
      { id: 2, username: "Anonymous", content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
      ],
    }
    this.onNewPost = this.onNewPost.bind(this);
    this.onNameSet = this.onNameSet.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onmessage = (event) => {
      const inboundmsg = JSON.parse(event.data)
      const newmessages = this.state.messages.concat(inboundmsg)
      this.setState({messages: newmessages})
    }
  }

  onNewPost(post) {
    const user = this.state.currentUser.name
    const newMessage = {type: "msg", username: user, content: post};
    this.socket.send(JSON.stringify(newMessage))
  }

  onNameSet(username) {
    const oldname = this.state.currentUser.name
    this.setState({currentUser:{name: username}})
    const alertstring = `${oldname} has changed its name to ${username}`
    console.log(alertstring)
    const nameChange = {type: "notification", content: alertstring}
    this.socket.send(JSON.stringify(nameChange))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar onNameSet = {this.onNameSet} onNewPost = {this.onNewPost}/>
      </div>
    );
  }
}
export default App;
