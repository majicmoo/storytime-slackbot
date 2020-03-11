import React, { FunctionComponent } from "react";
import classnames from "classnames";
import { NodeType } from "../types";

interface NodeTypeButtonProps {
  type: NodeType;
  currentType: NodeType;
  updateType(type: NodeType): void;
}

const NodeTypeButton: FunctionComponent<NodeTypeButtonProps> = ({
  type,
  currentType,
  updateType
}) => (
  <button
    className={classnames("node-type", {
      "node-type--selected": type === currentType
    })}
    onClick={() => updateType(type)}
  >
    {type}
  </button>
);

export default NodeTypeButton;
