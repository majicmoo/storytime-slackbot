import React, { FunctionComponent } from "react";
import { Node, NodeType } from "../types";
import NodeTypeButton from "./NodeTypeButton";

interface NodeTypes {
  startNode: boolean;
  node: Node;
  updateNode(node: Node): void;
}

const NodeTypes: FunctionComponent<NodeTypes> = ({
  startNode,
  node,
  updateNode
}) => {
  const updateType = (type: NodeType) => updateNode({ ...node, type });

  return (
    <div className="node-type--wrapper">
      {!startNode && (
        <NodeTypeButton
          type="Win"
          currentType={node.type}
          updateType={updateType}
        />
      )}
      <NodeTypeButton
        type="Normal"
        currentType={node.type}
        updateType={updateType}
      />
      {!startNode && (
        <NodeTypeButton
          type="Death"
          currentType={node.type}
          updateType={updateType}
        />
      )}
    </div>
  );
};

export default NodeTypes;
