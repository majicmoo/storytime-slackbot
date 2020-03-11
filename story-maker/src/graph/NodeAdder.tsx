import React, { FunctionComponent } from "react";

interface NodeAdderProps {
  onClick(): void;
}

const NodeAdder: FunctionComponent<NodeAdderProps> = ({ onClick }) => (
  <button className="button" onClick={onClick} title="add node">
    <i className="fas fa-plus-circle"></i>
  </button>
);

export default NodeAdder;
