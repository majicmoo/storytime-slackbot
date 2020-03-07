import { Story, Node, StoryOption } from "./types";
import { v4 as uuidv4 } from "uuid";
import { update } from "ramda";

export const addNode = (story: Story): Story => {
  const nodes = story.nodes;
  const updatedNodes: Node[] = [
    ...nodes,
    { type: "Normal", statement: "", id: uuidv4(), optionIds: [] }
  ];

  return { ...story, nodes: updatedNodes };
};

export const addOption = (story: Story, nodeId: string): Story => {
  const optionId = uuidv4();
  const options = story.options;
  const node = story.nodes.find(n => n.id === nodeId)!!; // TODO
  const updatedNode = { ...node, optionIds: [...node.optionIds, optionId] };
  const updatedOptions = [...options, { id: optionId, item: "" }];
  return { ...updateNode(story, updatedNode), options: updatedOptions };
};

export const updateNode = (story: Story, node: Node): Story => {
  const nodes = story.nodes;
  const nodeIndex = nodes.findIndex(n => n.id === node.id);
  const updatedNodes = update(nodeIndex, node, nodes);
  return { ...story, nodes: updatedNodes };
};

export const updateOption = (story: Story, option: StoryOption): Story => {
  const options = story.options;
  const index = options.findIndex(o => o.id === option.id);
  const updatedOptions = update(index, option, options);
  return { ...story, options: updatedOptions };
};
