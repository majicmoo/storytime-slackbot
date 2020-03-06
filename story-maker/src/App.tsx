import React from "react";
import "./App.css";
import { Story } from "./types";
import GraphTab from "./graph/GraphTab";
import JsonTab from "./JsonTab";

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
  private updateNodeStatement = (id: string, statement: string) => {
    const nodes = this.state.story.nodes;
    const node = nodes.find(n => n.id === id);
    // TODO: update
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
            updateNodeStatement={this.updateNodeStatement}
          />
        )}
        {tab === "json" && <JsonTab story={story} />}
      </div>
    );
  }
}

export default App;
