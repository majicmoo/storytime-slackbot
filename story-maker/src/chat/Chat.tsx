import React from "react";
import { Story, Node } from "../types";
import Narrator from "./Narrator";
interface ChatProps {
  story: Story;
}

interface ChatState {
  currentNode: Node;
  response: string;
  otherMessage?: string;
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

  private enter = () => {
    console.log("enter");
    const narrator = new Narrator(this.props.story, this.state.currentNode);
    const nextNode = narrator.getNext(this.state.response);

    if (nextNode !== undefined) {
      this.setState({ currentNode: nextNode, response: "" });
    } else {
      const response = narrator.handleNonMatch(this.state.response);
      this.setState({ otherMessage: response, response: "" });
    }
  };

  public render() {
    const { story } = this.props;
    const { currentNode, response, otherMessage } = this.state;
    return (
      <div>
        <p>beep boop beep under construction</p>
        <h1>{story.title}</h1>
        <p className="anim-typewriter">{currentNode.statement}</p>
        <p className="anim-typewriter">{otherMessage}</p>
        <input
          value={response}
          onChange={e =>
            this.setState({ response: e.target.value, otherMessage: "" })
          }
          onKeyDown={e => (e.key === "Enter" ? this.enter() : undefined)}
        />
      </div>
    );
  }
}

export default Chat;
