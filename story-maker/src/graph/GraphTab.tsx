import React, { FunctionComponent } from "react";
import { Story, Node, StoryOption, NodeTracker, Verb } from "../types";
import NodeComponent from "./Node";
import Option from "./Option";

import "./graph.css";
import Line from "./Line";
import Lines from "../Lines";

interface GraphTabProps {
  story: Story;
  nodeTracker: NodeTracker[];
  updateTitle(title: string): void;
  updateNode(node: Node): void;
  addOption(nodeId: string): void;
  addNode(option: StoryOption, verb: Verb): void;
  updateOption(option: StoryOption): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number
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
  addNode
}) => (
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
        addOrUpdateNodeTracker={addOrUpdateNodeTracker}
        x={index}
        y={index}
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
