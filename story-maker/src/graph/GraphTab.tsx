import React, { FunctionComponent } from "react";
import { Story } from "../types";
import NodeComponent from "./Node";

interface GraphTabProps {
  story: Story;
  updateTitle(title: string): void;
  updateNodeStatement(id: string, statement: string): void;
}

const GraphTab: FunctionComponent<GraphTabProps> = ({
  story,
  updateTitle,
  updateNodeStatement
}) => (
  <div>
    <input
      value={story.title}
      onChange={event => updateTitle(event.target.value)}
    />
    <NodeComponent
      node={story.nodes[0]}
      updateStatement={updateNodeStatement}
    />
  </div>
);

export default GraphTab;
