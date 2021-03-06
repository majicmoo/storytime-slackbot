import React from "react";
import "./App.css";
import {
  Story,
  Node,
  StoryOption,
  NodeTracker,
  Verb,
  LineCoordinates
} from "./types";
import GraphTab from "./graph/GraphTab";
import JsonTab from "./JsonTab";
import { update } from "ramda";
import {
  addNode,
  updateNode,
  addOption,
  updateOption,
  removeNode,
  removeOption,
  connectToOption
} from "./StoryUpdater";
import { removeNodeFromTracker } from "./NodeTrackerHelper";
import Chat from "./chat/Chat";
import Switcher, { Tab } from "./Switcher";
import { validate } from "./ValidateStoryJson";

interface AppState {
  tab: Tab;
  story: Story;
  nodeTracker: NodeTracker[];
  showLine: boolean;
  lineCoordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

const firstNodeId = "first-node";
const initState: AppState = {
  tab: "graph",
  story: {
    title: "",
    nodes: [{ statement: "", type: "Normal", optionIds: [], id: firstNodeId }],
    options: []
  },
  nodeTracker: [],
  showLine: false,
  lineCoordinates: { x1: 0, y1: 0, x2: 0, y2: 0 }
};

class App extends React.Component<{}, AppState> {
  public state: AppState = initState;

  private updateTab = (tab: Tab) => this.setState({ tab });
  private updateTitle = (title: string) =>
    this.setState({ story: { ...this.state.story, title } });
  private updateNode = (node: Node) => {
    this.setState({ story: updateNode(this.state.story, node) });
  };

  componentDidMount() {
    const story = localStorage.getItem("story");

    if (story) {
      try {
        const parsedJson = JSON.parse(story);
        validate(parsedJson.story);
        this.setState(parsedJson);
      } catch (e) {
        console.log("could not parse story in local storage");
      }
    }
  }

  componentDidUpdate() {
    localStorage.setItem("story", JSON.stringify(this.state));
  }

  private addOrUpdateNodeTracker = (
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const { nodeTracker } = this.state;
    const index = nodeTracker.findIndex(n => n.id === id);
    const node = { id, x, y, type, width, height };
    if (index === -1) {
      this.setState({ nodeTracker: [...nodeTracker, node] });
    } else {
      this.setState({ nodeTracker: update(index, node, nodeTracker) });
    }
  };

  private addNode = (option: StoryOption, verb: Verb) => {
    this.setState({ story: addNode(this.state.story, option, verb) });
  };

  private removeNode = (node: Node) => {
    this.setState({
      story: removeNode(this.state.story, node),
      nodeTracker: removeNodeFromTracker(this.state.nodeTracker, node.id)
    });
  };

  private removeOption = (option: StoryOption) => {
    this.setState({
      story: removeOption(this.state.story, option),
      nodeTracker: removeNodeFromTracker(this.state.nodeTracker, option.id)
    });
  };
  private addOption = (nodeId: string) => {
    this.updateStory(addOption(this.state.story, nodeId));
  };

  private updateOption = (option: StoryOption) => {
    this.updateStory(updateOption(this.state.story, option));
  };

  private updateStory = (story: Story) => this.setState({ story });

  private connectToOption = (node: Node, optionId: string) => {
    this.updateStory(connectToOption(this.state.story, node, optionId));
  };

  private drawLine = (lineCoordinates: LineCoordinates) =>
    this.setState({ showLine: true, lineCoordinates });
  private stopDrawingLine = () => this.setState({ showLine: false });

  private reset = () => {
    if (window.confirm("Are you sure you want to start again?")) {
      const firstTrackedNode = this.state.nodeTracker.find(
        n => n.id === firstNodeId
      );
      this.setState({
        ...initState,
        nodeTracker: firstTrackedNode ? [firstTrackedNode] : []
      });
    }
  };

  public render() {
    const { tab, story, nodeTracker, showLine, lineCoordinates } = this.state;

    return (
      <div className="App">
        <div className="navbar">
          <div className="tab-switcher">
            <Switcher
              tab="graph"
              update={this.updateTab}
              icon="fas fa-sitemap"
              currentTab={tab}
            />
            <Switcher
              tab="json"
              update={this.updateTab}
              icon="far fa-file"
              currentTab={tab}
            />
            <Switcher
              tab="chat"
              update={this.updateTab}
              icon="fas fa-robot"
              currentTab={tab}
            />
            <Switcher
              tab="info"
              update={this.updateTab}
              icon="fas fa-info"
              currentTab={tab}
            />
          </div>
          <button className="reset" title="reset" onClick={this.reset}>
            <i className="fas fa-undo-alt" />
          </button>
        </div>

        <div className={tab === "graph" ? "" : "tab--hidden"}>
          <GraphTab
            story={story}
            nodeTrackers={nodeTracker}
            updateTitle={this.updateTitle}
            updateNode={this.updateNode}
            removeNode={this.removeNode}
            removeOption={this.removeOption}
            addOption={this.addOption}
            addNode={this.addNode}
            updateOption={this.updateOption}
            connectToOption={this.connectToOption}
            addOrUpdateNodeTracker={this.addOrUpdateNodeTracker}
            showLine={showLine}
            lineCoordinates={lineCoordinates}
            drawLine={this.drawLine}
            stopDrawingLine={this.stopDrawingLine}
          />
        </div>
        <div className={tab === "json" ? "" : "tab--hidden"}>
          <JsonTab story={story} updateStory={this.updateStory} />
        </div>
        <div className={tab === "chat" ? "" : "tab--hidden"}>
          <Chat story={story} />
        </div>
        <div className={tab === "info" ? "" : "tab--hidden"}>
          <h1>text adventure creator</h1>
          <p>Create your own text adventure using the graph tab or json tab.</p>
          <p>Test out in bot tab.</p>
          <p>Export by copying/downloading json.</p>
          <div>
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/majicmoo/storytime-slackbot"
            >
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
