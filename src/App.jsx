import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: ""
    }
    this.onNewPost = this.onNewPost.bind(this);
    this.onNameSet = this.onNameSet.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onmessage = (event) => {
      const inboundmsg = JSON.parse(event.data)
      if (inboundmsg.userCount !== undefined) {
        this.setState({userCount: inboundmsg.userCount})
      } else {
        const newmessages = this.state.messages.concat(inboundmsg)
        this.setState({messages: newmessages})
      }
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
    const nameChange = {type: "notification", content: alertstring}
    this.socket.send(JSON.stringify(nameChange))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          {
            this.state.userCount === 1 ?
            <p className= "count"> {this.state.userCount} user online </p>:
            <p className= "count"> {this.state.userCount} users online </p>
          }
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar onNameSet = {this.onNameSet} onNewPost = {this.onNewPost}/>
      </div>
    );
  }
}
export default App;
