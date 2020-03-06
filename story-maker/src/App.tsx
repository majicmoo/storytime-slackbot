import React from "react";
import "./App.css";

interface AppState {
  tab: "pretty" | "json";
}

class App extends React.Component<{}, AppState> {
  public render() {
    return <div className="App">Hello world</div>;
  }
}

export default App;
