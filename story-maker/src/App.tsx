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

interface AppState {
  tab: "graph" | "json";
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

class App extends React.Component<{}, AppState> {
  public state: AppState = {
    tab: "graph",
    story: {
      title: "",
      nodes: [
        { statement: "", type: "Normal", optionIds: [], id: "first-node" }
      ],
      options: []
    },
    nodeTracker: [],
    showLine: false,
    lineCoordinates: { x1: 0, y1: 0, x2: 0, y2: 0 }
  };

  private updateTab = (tab: "graph" | "json") => this.setState({ tab });
  private updateTitle = (title: string) =>
    this.setState({ story: { ...this.state.story, title } });
  private updateNode = (node: Node) => {
    this.setState({ story: updateNode(this.state.story, node) });
  };

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

  public render() {
    const { tab, story, nodeTracker, showLine, lineCoordinates } = this.state;

    return (
      <div className="App">
        <div className="tab-switcher">
          <button
            className="switcher"
            title="graph"
            onClick={() => this.updateTab("graph")}
          >
            <i className="fas fa-sitemap" />
          </button>
          <button
            className="switcher"
            title="json"
            onClick={() => this.updateTab("json")}
          >
            <i className="far fa-file" />
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
      </div>
    );
  }
}

export default App;
