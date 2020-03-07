import React from "react";
import "./App.css";
import { Story, Node, StoryOption } from "./types";
import GraphTab from "./graph/GraphTab";
import JsonTab from "./JsonTab";
import { adjust } from "ramda";
import { addNode, updateNode, addOption, updateOption } from "./StoryUpdater";

interface AppState {
  tab: "graph" | "json";
  story: Story;
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
    }
  };

  private updateTab = (tab: "graph" | "json") => this.setState({ tab });
  private updateTitle = (title: string) =>
    this.setState({ story: { ...this.state.story, title } });
  private updateNode = (node: Node) => {
    this.setState({ story: updateNode(this.state.story, node) });
  };

  // private addNode = () => {
  //   this.setState({ story: addNode(this.state.story) });
  // };
  private addOption = (nodeId: string) => {
    this.setState({ story: addOption(this.state.story, nodeId) });
  };
  private updateOption = (option: StoryOption) => {
    this.setState({ story: updateOption(this.state.story, option) });
  };

  public render() {
    const { tab, story } = this.state;
    return (
      <div className="App">
        <div className="tab-switcher">
          <button onClick={() => this.updateTab("graph")}>Graph</button>
          <button onClick={() => this.updateTab("json")}>JSON</button>
        </div>
        {tab === "graph" && (
          <GraphTab
            story={story}
            updateTitle={this.updateTitle}
            updateNode={this.updateNode}
            addOption={this.addOption}
            updateOption={this.updateOption}
          />
        )}
        {tab === "json" && <JsonTab story={story} />}
      </div>
    );
  }
}

export default App;
