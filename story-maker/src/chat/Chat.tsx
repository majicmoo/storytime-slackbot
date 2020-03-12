import React from "react";
import { Story, Node } from "../types";
interface ChatProps {
  story: Story;
}

interface ChatState {
  currentNode: Node;
  response: string;
}

class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = { currentNode: props.story.nodes[0], response: "" };
  }

  public componentDidUpdate(prevProps: ChatProps) {
    if (prevProps.story !== this.props.story) {
      this.setState({
        currentNode: this.props.story.nodes[0],
        response: ""
      });
    }
  }

  public render() {
    const { story } = this.props;
    const { currentNode, response } = this.state;
    return (
      <div>
        <p>beep boop beep under construction</p>
        <h1>{story.title}</h1>
        <p>{currentNode.statement}</p>
        <input
          value={response}
          onChange={e => this.setState({ response: e.target.value })}
        />
      </div>
    );
  }
}

export default Chat;
