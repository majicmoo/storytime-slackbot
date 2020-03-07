import { Story, Node, StoryOption, Verb } from "./types";
import { v4 as uuidv4 } from "uuid";
import { update } from "ramda";

export const addNode = (
  story: Story,
  option: StoryOption,
  verb: Verb
): Story => {
  const nodes = story.nodes;
  const id = uuidv4();
  const updatedNodes: Node[] = [
    ...nodes,
    { type: "Normal", statement: "", id, optionIds: [] }
  ];

  const optionIndex = story.options.findIndex(o => o.id === option.id);
  const updatedOption: StoryOption = {
    ...option,
    ...(verb === "taste" && { tasteId: id }),
    ...(verb === "touch" && { touchId: id }),
    ...(verb === "listen" && { listenId: id }),
    ...(verb === "look" && { lookId: id }),
    ...(verb === "smell" && { smellId: id })
  };

  const options = update(optionIndex, updatedOption, story.options);

  return { ...story, nodes: updatedNodes, options };
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
