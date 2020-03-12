import React, { FunctionComponent } from "react";
import { Node, NodeTracker, LineCoordinates } from "../types";

import DraggableDiv from "./DraggableDiv";
import NodeAdder from "./NodeAdder";
import Connector from "./Connector";
import NodeTypes from "./NodeTypes";

interface NodeProps {
  node: Node;
  nodeTracker?: NodeTracker;
  nodeTrackers: NodeTracker[];
  startNode: boolean;
  updateNode(node: Node): void;
  removeNode(node: Node): void;
  addOption(nodeId: string): void;
  connectToOption(node: Node, optionId: string): void;
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
  drawLine(lineCoordinates: LineCoordinates): void;
  stopDrawingLine(): void;
  drawing: boolean;
}

const NodeComponent: FunctionComponent<NodeProps> = ({
  node,
  updateNode,
  addOption,
  removeNode,
  x,
  y,
  addOrUpdateNodeTracker,
  nodeTracker,
  nodeTrackers,
  startNode,
  connectToOption,
  drawLine,
  stopDrawingLine,
  drawing
}) => (
  <DraggableDiv
    x={x}
    y={y}
    onUpdatePosition={(updatedX, updatedY, width, height) =>
      addOrUpdateNodeTracker(node.id, "Node", updatedX, updatedY, width, height)
    }
  >
    <Connector
      drawFrom="bottom"
      drawLine={drawLine}
      stopDrawingLine={stopDrawingLine}
      drawing={drawing}
      nodeTrackers={nodeTrackers}
      nodeTracker={
        nodeTracker || {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          id: node.id,
          type: "Node"
        }
      }
      canCollideWith="StoryOption"
      onCollision={optionId => connectToOption(node, optionId)}
    >
      <div className="node">
        <textarea
          placeholder="Add a statement e.g. You walk into a dark room."
          value={node.statement}
          onChange={e => updateNode({ ...node, statement: e.target.value })}
        />
        <NodeTypes updateNode={updateNode} node={node} startNode={startNode} />
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
    </Connector>
  </DraggableDiv>
);
export default NodeComponent;
