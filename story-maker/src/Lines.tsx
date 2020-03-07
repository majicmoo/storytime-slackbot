import React from "react";
import Line from "./graph/Line";
import { NodeTracker, Story, Node } from "./types";

interface LinesProps {
  nodeTracker: NodeTracker[];
  story: Story;
}

class Lines extends React.Component<LinesProps> {
  public render() {
    const { nodeTracker, story } = this.props;
    const lines = calcLinesFromNodes(nodeTracker, story);
    const otherLines = calcLinesFromStoryOptions(nodeTracker, story);

    return (
      <>
        {lines.map((line, index) => (
          <Line {...line} key={`line-${index}`} />
        ))}
        {otherLines.map((line, index) => (
          <Line {...line} key={`other-lines-${index}`} />
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
        if (option.listenId) {
          stuff.push(aaa(option.listenId, nodeTracker, trackedNode));
        }
        if (option.lookId) {
          stuff.push(aaa(option.lookId, nodeTracker, trackedNode));
        }
        if (option.smellId) {
          stuff.push(aaa(option.smellId, nodeTracker, trackedNode));
        }
        if (option.tasteId) {
          stuff.push(aaa(option.tasteId, nodeTracker, trackedNode));
        }
        if (option.touchId) {
          stuff.push(aaa(option.touchId, nodeTracker, trackedNode));
        }

        return stuff;
      }
    })
    .filter(n => n !== undefined) as any;

const aaa = (
  id: string,
  nodeTracker: NodeTracker[],
  parentNodeTracker: NodeTracker
): LineType | undefined => {
  const found = nodeTracker.find(n => n.id === id);
  return found ? makeLine(parentNodeTracker, found) : undefined;
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
  x1: trackedNode.x,
  y1: trackedNode.y,
  x2: trackedOption.x,
  y2: trackedOption.y
});
