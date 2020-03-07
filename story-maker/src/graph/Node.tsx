import React, { FunctionComponent } from "react";
import { Node } from "../types";

import DraggableDiv from "./DraggableDiv";

interface NodeProps {
  node: Node;
  updateNode(node: Node): void;
  addOption(nodeId: string): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number
  ): void;

  x: number;
  y: number;
}

const NodeComponent: FunctionComponent<NodeProps> = ({
  node,
  updateNode,
  addOption,
  x,
  y,
  addOrUpdateNodeTracker
}) => (
  <DraggableDiv
    className="node"
    x={x}
    y={y}
    onUpdatePosition={(updatedX, updatedY) =>
      addOrUpdateNodeTracker(node.id, "Node", updatedX, updatedY)
    }
  >
    <input
      value={node.statement}
      onChange={e => updateNode({ ...node, statement: e.target.value })}
    />
    <p>{node.type}</p>
    <button onClick={() => addOption(node.id)}>Add Option</button>
  </DraggableDiv>
);

export default NodeComponent;
