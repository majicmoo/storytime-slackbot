import React, { FunctionComponent } from "react";
import classnames from "classnames";
import { Node, NodeType } from "../types";

import DraggableDiv from "./DraggableDiv";
import NodeAdder from "./NodeAdder";
import NodeTypeButton from "./NodeTypeButton";

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
}) => {
  const updateType = (type: NodeType) => updateNode({ ...node, type });
  return (
    <DraggableDiv
      x={x}
      y={y}
      onUpdatePosition={(updatedX, updatedY, width, height) =>
        addOrUpdateNodeTracker(
          node.id,
          "Node",
          updatedX,
          updatedY,
          width,
          height
        )
      }
    >
      <div className="node">
        <textarea
          placeholder="Add a statement e.g. You walk into a dark room."
          value={node.statement}
          onChange={e => updateNode({ ...node, statement: e.target.value })}
        />
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
        {node.type === "Normal" && (
          <NodeAdder onClick={() => addOption(node.id)} />
        )}
        {!startNode && (
          <button
            className="button"
            title="remove node"
            onClick={() => removeNode(node)}
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        )}
      </div>
    </DraggableDiv>
  );
};

export default NodeComponent;
