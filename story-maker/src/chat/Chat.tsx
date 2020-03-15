import React, { createRef, RefObject, Fragment } from "react";
import { Story, Node } from "../types";
import Narrator from "./Narrator";
import classnames from "classnames";

import "./Chat.css";

interface ChatProps {
  story: Story;
}

interface ChatState {
  currentNode: Node;
  response: string;
  otherMessage?: string;
  history: string[][];
}

class Chat extends React.Component<ChatProps, ChatState> {
  private historyRef: RefObject<HTMLDivElement> = createRef();

  constructor(props: ChatProps) {
    super(props);
    this.state = {
      currentNode: props.story.nodes[0],
      response: "",
      history: [["", props.story.nodes[0].statement]]
    };
  }

  public componentDidUpdate(prevProps: ChatProps) {
    if (prevProps.story !== this.props.story) {
      this.setState({
        currentNode: this.props.story.nodes[0],
        response: "",
        otherMessage: undefined,
        history: [["", this.props.story.nodes[0].statement]]
      });
    }
  }

  private enter = () => {
    const narrator = new Narrator(this.props.story, this.state.currentNode);
    const nextNode = narrator.getNext(this.state.response);

    if (nextNode !== undefined) {
      const history = [
        ...this.state.history,
        [this.state.response, nextNode.statement]
      ];

      this.setState({
        currentNode: nextNode,
        response: "",
        history
      });
    } else {
      const botResponse = narrator.handleNonMatch(this.state.response);
      const history = [
        ...this.state.history,
        [this.state.response, botResponse]
      ];

      this.setState({ otherMessage: botResponse, response: "", history });
    }
    setTimeout(() => {
      if (this.historyRef.current) {
        this.historyRef.current.scrollTop = this.historyRef.current.scrollHeight;
      }
    });
  };

  public render() {
    const { story } = this.props;
    const { response, history } = this.state;
    return (
      <div className="chat">
        <h1>{story.title}</h1>
        <div className="history-book">
          <div className="history-book--inner" ref={this.historyRef}>
            {history.map(([humanStatement, botStatement], i) => (
              <Fragment key={`history--${i}`}>
                <p className="human-statement">{humanStatement}</p>
                <p
                  className={classnames("bot-statement", {
                    "current-node": i + 1 === history.length
                  })}
                >
                  {botStatement}
                </p>
              </Fragment>
            ))}
          </div>
        </div>

        <input
          value={response}
          className="chat--input"
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
