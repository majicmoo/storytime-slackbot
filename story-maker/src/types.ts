export interface Node {
  id: string;
  statement: string;
  optionIds: string[];
  type: "Normal" | "Win" | "Death";
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
