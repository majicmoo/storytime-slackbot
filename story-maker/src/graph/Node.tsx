import React, { FunctionComponent } from "react";
import { Node } from "../types";

import DraggableDiv from "./DraggableDiv";

interface NodeProps {
  node: Node;
  startNode: boolean;
  updateNode(node: Node): void;
  removeNode(node: Node): void;
  addOption(nodeId: string): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  x: number;
  y: number;
}

const NodeComponent: FunctionComponent<NodeProps> = ({
  node,
  updateNode,
  addOption,
  removeNode,
  x,
  y,
  addOrUpdateNodeTracker,
  startNode
}) => (
  <DraggableDiv
    className="node"
    x={x}
    y={y}
    onUpdatePosition={(updatedX, updatedY, width, height) =>
      addOrUpdateNodeTracker(node.id, "Node", updatedX, updatedY, width, height)
    }
  >
    <input
      value={node.statement}
      onChange={e => updateNode({ ...node, statement: e.target.value })}
    />
    <p>{node.type}</p>
    <button onClick={() => addOption(node.id)}>Add Option</button>
    {!startNode && <button onClick={() => removeNode(node)}>Remove</button>}
  </DraggableDiv>
);

export default NodeComponent;
