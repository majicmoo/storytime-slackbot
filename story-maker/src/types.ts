export type NodeType = "Normal" | "Win" | "Death";

export interface Node {
  id: string;
  statement: string;
  optionIds: string[];
  type: NodeType;
}

export interface StoryOption {
  id: string;
  item: string;
  tasteId?: string;
  touchId?: string;
  smellId?: string;
  lookId?: string;
  listenId?: string;
}

export interface Story {
  title: string;
  nodes: Node[];
  options: StoryOption[];
}

export type NodeTrackerType = "Node" | "StoryOption";

export interface NodeTracker {
  id: string;
  type: NodeTrackerType;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LineCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Verb = "taste" | "touch" | "smell" | "look" | "listen";
export const VERBS: Verb[] = ["taste", "touch", "smell", "look", "listen"];
