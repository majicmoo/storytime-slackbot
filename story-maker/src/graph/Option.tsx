import React, { FunctionComponent } from "react";
import { StoryOption } from "../types";
import DraggableDiv from "./DraggableDiv";

interface OptionProps {
  option: StoryOption;
  updateOption(option: StoryOption): void;
  x: number;
  y: number;
}
const Option: FunctionComponent<OptionProps> = ({
  option,
  updateOption,
  x,
  y
}) => (
  <DraggableDiv className="option" x={x} y={y}>
    <input
      value={option.item}
      onChange={event => updateOption({ ...option, item: event.target.value })}
    />
  </DraggableDiv>
);

export default Option;
