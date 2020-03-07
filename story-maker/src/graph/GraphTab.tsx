import React, { FunctionComponent } from "react";
import { Story, Node, StoryOption } from "../types";
import NodeComponent from "./Node";
import Option from "./Option";

import "./graph.css";

interface GraphTabProps {
  story: Story;
  updateTitle(title: string): void;
  updateNode(node: Node): void;
  addOption(nodeId: string): void;
  updateOption(option: StoryOption): void;
}

const GraphTab: FunctionComponent<GraphTabProps> = ({
  story,
  updateTitle,
  updateNode,
  updateOption,
  addOption
}) => {
  return (
    <div>
      <input
        value={story.title}
        onChange={event => updateTitle(event.target.value)}
      />
      {story.nodes.map((node, index) => (
        <NodeComponent
          key={node.id}
          node={node}
          addOption={addOption}
          updateNode={updateNode}
          x={index}
          y={index}
        />
      ))}

      {story.options.map((option, index) => (
        <Option
          option={option}
          key={option.id}
          updateOption={updateOption}
          x={index}
          y={index}
        />
      ))}
    </div>
  );
};

export default GraphTab;
