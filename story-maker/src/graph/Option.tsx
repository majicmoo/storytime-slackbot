import React, { FunctionComponent } from "react";
import { StoryOption } from "../types";
import DraggableDiv from "./DraggableDiv";

interface OptionProps {
  option: StoryOption;
  updateOption(option: StoryOption): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number
  ): void;
  x: number;
  y: number;
}
const Option: FunctionComponent<OptionProps> = ({
  option,
  updateOption,
  x,
  y,
  addOrUpdateNodeTracker
}) => (
  <DraggableDiv
    className="option"
    x={x}
    y={y}
    onUpdatePosition={(updatedX, updatedY) =>
      addOrUpdateNodeTracker(option.id, "StoryOption", updatedX, updatedY)
    }
  >
    <p>Option</p>
    <input
      value={option.item}
      onChange={event => updateOption({ ...option, item: event.target.value })}
    />
  </DraggableDiv>
);

export default Option;
