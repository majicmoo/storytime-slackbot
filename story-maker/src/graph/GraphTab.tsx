import React, { FunctionComponent } from "react";
import { Story, Node, StoryOption, NodeTracker, Verb } from "../types";
import NodeComponent from "./Node";
import Option from "./Option";

import "./graph.css";
import Lines from "./Lines";

interface GraphTabProps {
  story: Story;
  nodeTracker: NodeTracker[];
  updateTitle(title: string): void;
  updateNode(node: Node): void;
  removeNode(node: Node): void;
  addOption(nodeId: string): void;
  addNode(option: StoryOption, verb: Verb): void;
  updateOption(option: StoryOption): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
}

const GraphTab: FunctionComponent<GraphTabProps> = ({
  story,
  nodeTracker,
  updateTitle,
  updateNode,
  updateOption,
  addOrUpdateNodeTracker,
  addOption,
  addNode,
  removeNode
}) => (
  <div>
    <input
      value={story.title}
      className="title"
      placeholder="Title"
      onChange={event => updateTitle(event.target.value)}
    />
    {story.nodes.map((node, index) => (
      <NodeComponent
        key={node.id}
        node={node}
        addOption={addOption}
        updateNode={updateNode}
        removeNode={removeNode}
        addOrUpdateNodeTracker={addOrUpdateNodeTracker}
        x={index}
        y={index}
        startNode={index === 0}
      />
    ))}

    {story.options.map((option, index) => (
      <Option
        option={option}
        key={option.id}
        updateOption={updateOption}
        addOrUpdateNodeTracker={addOrUpdateNodeTracker}
        addNode={addNode}
        x={index}
        y={index}
      />
    ))}
    <Lines story={story} nodeTracker={nodeTracker} />
  </div>
);

export default GraphTab;
