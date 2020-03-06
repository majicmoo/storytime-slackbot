import React, { FunctionComponent } from "react";
import { Node } from "../types";

import "./node.css";

interface NodeProps {
  node: Node;
  updateStatement(nodeId: string, statement: string): void;
}

const NodeComponent: FunctionComponent<NodeProps> = ({
  node: { statement, type, id },
  updateStatement
}) => (
  <div className="node">
    <input
      value={statement}
      onChange={e => updateStatement(id, e.target.value)}
    />
    <p>{type}</p>
  </div>
);

export default NodeComponent;
