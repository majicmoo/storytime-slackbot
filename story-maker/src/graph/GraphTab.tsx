import React, { FunctionComponent } from "react";
import {
  Story,
  Node,
  StoryOption,
  NodeTracker,
  Verb,
  LineCoordinates
} from "../types";
import NodeComponent from "./Node";
import Option from "./Option";

import "./graph.css";
import Lines from "./Lines";
import ConnectorArrow from "./ConnectorArrow";

interface GraphTabProps {
  story: Story;
  nodeTrackers: NodeTracker[];
  updateTitle(title: string): void;
  updateNode(node: Node): void;
  removeNode(node: Node): void;
  removeOption(option: StoryOption): void;
  addOption(nodeId: string): void;
  addNode(option: StoryOption, verb: Verb): void;
  updateOption(option: StoryOption): void;
  connectToOption(node: Node, optionId: string): void;
  drawLine(lineCoordinates: LineCoordinates): void;
  stopDrawingLine(): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  lineCoordinates: LineCoordinates;
  showLine: boolean;
}

const GraphTab: FunctionComponent<GraphTabProps> = ({
  story,
  nodeTrackers,
  updateTitle,
  updateNode,
  connectToOption,
  updateOption,
  addOrUpdateNodeTracker,
  addOption,
  removeOption,
  addNode,
  removeNode,
  lineCoordinates,
  showLine,
  drawLine,
  stopDrawingLine
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
        nodeTracker={nodeTrackers.find(n => n.id === node.id)}
        nodeTrackers={nodeTrackers}
        node={node}
        addOption={addOption}
        updateNode={updateNode}
        removeNode={removeNode}
        addOrUpdateNodeTracker={addOrUpdateNodeTracker}
        connectToOption={connectToOption}
        drawLine={drawLine}
        stopDrawingLine={stopDrawingLine}
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
        removeOption={removeOption}
        addOrUpdateNodeTracker={addOrUpdateNodeTracker}
        addNode={addNode}
        x={index}
        y={index}
      />
    ))}
    <Lines story={story} nodeTracker={nodeTrackers} />
    <ConnectorArrow drawing={showLine} {...lineCoordinates} />
  </div>
);

export default GraphTab;
