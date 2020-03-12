import React from "react";
import Line from "./Line";
import { NodeTracker, Story, Node } from "../types";

interface LinesProps {
  nodeTracker: NodeTracker[];
  story: Story;
}

class Lines extends React.Component<LinesProps> {
  public render() {
    const { nodeTracker, story } = this.props;

    const lines = [
      ...calcLinesFromNodes(nodeTracker, story),
      ...calcLinesFromStoryOptions(nodeTracker, story)
    ];

    return (
      <>
        {lines.map((line, index) => (
          <Line {...line} key={`line-${index}`} position="absolute" />
        ))}
      </>
    );
  }
}

export default Lines;

interface LineType {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const calcLinesFromStoryOptions = (
  nodeTracker: NodeTracker[],
  story: Story
): LineType[] =>
  nodeTracker
    .flatMap(trackedNode => {
      const option = story.options.find(o => o.id === trackedNode.id);
      if (option) {
        const stuff = [];
        if (option.tasteId) {
          stuff.push(
            makeOptionalOptionLine(option.tasteId, nodeTracker, trackedNode, 0)
          );
        }

        if (option.touchId) {
          stuff.push(
            makeOptionalOptionLine(option.touchId, nodeTracker, trackedNode, 1)
          );
        }

        if (option.smellId) {
          stuff.push(
            makeOptionalOptionLine(option.smellId, nodeTracker, trackedNode, 2)
          );
        }
        if (option.lookId) {
          stuff.push(
            makeOptionalOptionLine(option.lookId, nodeTracker, trackedNode, 3)
          );
        }
        if (option.listenId) {
          stuff.push(
            makeOptionalOptionLine(option.listenId, nodeTracker, trackedNode, 4)
          );
        }

        return stuff;
      }
    })
    .filter(n => n !== undefined) as any;

const makeOptionalOptionLine = (
  id: string,
  nodeTracker: NodeTracker[],
  parentNodeTracker: NodeTracker,
  index: number
): LineType | undefined => {
  const found = nodeTracker.find(n => n.id === id);
  return found ? makeOptionLine(parentNodeTracker, found, index) : undefined;
};

const calcLinesFromNodes = (
  nodeTracker: NodeTracker[],
  story: Story
): LineType[] =>
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
): LineType[] => {
  const options: NodeTracker[] = node.optionIds
    .map(oid => nodeTracker.find(n => n.id === oid))
    .filter(n => n !== undefined) as any;
  return options.map(o => makeLine(trackedNode, o));
};

const makeLine = (trackedNode: NodeTracker, trackedOption: NodeTracker) => ({
  x1: trackedNode.x + trackedNode.width / 2,
  y1: trackedNode.y + trackedNode.height,
  x2: trackedOption.x + trackedOption.width / 2,
  y2: trackedOption.y
});

const makeOptionLine = (
  trackedNode: NodeTracker,
  trackedOption: NodeTracker,
  index: number
) => ({
  x1: trackedNode.x + (index / 5) * trackedNode.width + 0.1 * trackedNode.width,
  y1: trackedNode.y + trackedNode.height,
  x2: trackedOption.x + trackedOption.width / 2,
  y2: trackedOption.y
});
