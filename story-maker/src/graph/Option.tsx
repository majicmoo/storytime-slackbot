import React, { FunctionComponent } from "react";
import { StoryOption, Verb } from "../types";
import DraggableDiv from "./DraggableDiv";
import VerbComponent from "./Verb";

interface OptionProps {
  option: StoryOption;
  updateOption(option: StoryOption): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number
  ): void;
  addNode(option: StoryOption, verb: Verb): void;
  x: number;
  y: number;
}

class Option extends React.Component<OptionProps> {
  private addNode = (verb: Verb) => this.props.addNode(this.props.option, verb);

  public render() {
    const { option, updateOption, x, y, addOrUpdateNodeTracker } = this.props;
    return (
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
          onChange={event =>
            updateOption({ ...option, item: event.target.value })
          }
        />
        <div className="verbs">
          <VerbComponent verb="taste" addVerb={this.addNode} />
          <VerbComponent verb="touch" addVerb={this.addNode} />
          <VerbComponent verb="smell" addVerb={this.addNode} />
          <VerbComponent verb="look" addVerb={this.addNode} />
          <VerbComponent verb="listen" addVerb={this.addNode} />
        </div>
      </DraggableDiv>
    );
  }
}

export default Option;
