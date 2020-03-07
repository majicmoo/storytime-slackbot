import React, { FunctionComponent } from "react";
import { Story, Node, StoryOption, NodeTracker } from "../types";
import NodeComponent from "./Node";
import Option from "./Option";

import "./graph.css";

interface GraphTabProps {
  story: Story;
  nodeTracker: NodeTracker[];
  updateTitle(title: string): void;
  updateNode(node: Node): void;
  addOption(nodeId: string): void;
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
  addOption
}) => {
  const lines = calcLines(nodeTracker, story);
  console.log(lines);
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
          x={index}
          y={index}
        />
      ))}
      {lines.map((line, index) => (
        <svg
          key={`line-${index}`}
          width="500"
          height="500"
          className="line-wrapper"
        >
          <line {...line} className="line" stroke="black" />
        </svg>
      ))}
    </div>
  );
};

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const calcLines = (nodeTracker: NodeTracker[], story: Story): Line[] =>
  nodeTracker
    .flatMap(trackedNode => {
      const node = story.nodes.find(n => n.id === trackedNode.id);
      if (node) {
        return what(nodeTracker, node, trackedNode);
      }
    })
    .filter(n => n !== undefined) as any;

const what = (
  nodeTracker: NodeTracker[],
  node: Node,
  trackedNode: NodeTracker
): Line[] => {
  const options: NodeTracker[] = node.optionIds
    .map(oid => nodeTracker.find(n => n.id === oid))
    .filter(n => n !== undefined) as any;
  return options.map(o => makeLine(trackedNode, o));
};

const makeLine = (trackedNode: NodeTracker, trackedOption: NodeTracker) => ({
  x1: trackedNode.x,
  y1: trackedNode.y,
  x2: trackedOption.x,
  y2: trackedOption.y
});

export default GraphTab;
