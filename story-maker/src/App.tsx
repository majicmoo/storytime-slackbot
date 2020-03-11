import React from "react";
import "./App.css";
import { Story, Node, StoryOption, NodeTracker, Verb } from "./types";
import GraphTab from "./graph/GraphTab";
import JsonTab from "./JsonTab";
import { update } from "ramda";
import {
  addNode,
  updateNode,
  addOption,
  updateOption,
  removeNode
} from "./StoryUpdater";
import { removeNodeFromTracker } from "./NodeTrackerHelper";

interface AppState {
  tab: "graph" | "json";
  story: Story;
  nodeTracker: NodeTracker[];
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
    nodeTracker: []
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

  private addOption = (nodeId: string) => {
    this.setState({ story: addOption(this.state.story, nodeId) });
  };

  private updateOption = (option: StoryOption) => {
    this.setState({ story: updateOption(this.state.story, option) });
  };

  public render() {
    const { tab, story, nodeTracker } = this.state;

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
            nodeTracker={nodeTracker}
            updateTitle={this.updateTitle}
            updateNode={this.updateNode}
            removeNode={this.removeNode}
            addOption={this.addOption}
            addNode={this.addNode}
            updateOption={this.updateOption}
            addOrUpdateNodeTracker={this.addOrUpdateNodeTracker}
          />
        </div>
        <div className={tab === "json" ? "" : "tab--hidden"}>
          <JsonTab story={story} />
        </div>
      </div>
    );
  }
}

export default App;
