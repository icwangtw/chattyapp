import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

const rando = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      { id: "1", username: "Bob", content: "Has anyone seen my marbles?", },
      { id: "2", username: "Anonymous", content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
      ]
    }
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  onNewPost(post) {
      const user = this.state.currentUser.name
      const newMessage = {id: rando(), username: user, content: post};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
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
