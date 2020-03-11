import { NodeTracker } from "./types";

export const removeNodeFromTracker = (
  nodeTracker: NodeTracker[],
  id: string
): NodeTracker[] => nodeTracker.filter(n => n.id !== id);
