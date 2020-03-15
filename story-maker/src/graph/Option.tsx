import React from "react";
import { StoryOption, Verb, NodeTracker } from "../types";
import DraggableGraphNode from "./DraggableGraphNode";
import VerbComponent from "./Verb";

interface OptionProps {
  option: StoryOption;
  updateOption(option: StoryOption): void;
  removeOption(option: StoryOption): void;
  addOrUpdateNodeTracker(
    id: string,
    type: "Node" | "StoryOption",
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  addNode(option: StoryOption, verb: Verb): void;
  nodeTrackers: NodeTracker[];
}

class Option extends React.Component<OptionProps> {
  private addNode = (verb: Verb) => this.props.addNode(this.props.option, verb);

  public render() {
    const {
      option,
      updateOption,
      addOrUpdateNodeTracker,
      removeOption,
      nodeTrackers
    } = this.props;
    return (
      <DraggableGraphNode
        id={option.id}
        nodeTrackers={nodeTrackers}
        onUpdatePosition={(updatedX, updatedY, width, height) =>
          addOrUpdateNodeTracker(
            option.id,
            "StoryOption",
            updatedX,
            updatedY,
            width,
            height
          )
        }
      >
        <div className="option">
          <div className="option-top">
            <input
              value={option.item}
              placeholder="item to interact with e.g. book"
              onChange={event =>
                updateOption({ ...option, item: event.target.value })
              }
            />
            <div>
              <button
                className="button"
                title="remove node"
                onClick={() => removeOption(option)}
              >
                <i className="fas fa-minus-circle" />
              </button>
            </div>
          </div>
          <div className="verbs">
            <VerbComponent
              verb="taste"
              addVerb={this.addNode}
              disabled={option.tasteId !== undefined}
            />
            <VerbComponent
              verb="touch"
              addVerb={this.addNode}
              disabled={option.touchId !== undefined}
            />
            <VerbComponent
              verb="smell"
              addVerb={this.addNode}
              disabled={option.smellId !== undefined}
            />
            <VerbComponent
              verb="look"
              addVerb={this.addNode}
              disabled={option.lookId !== undefined}
            />
            <VerbComponent
              verb="listen"
              addVerb={this.addNode}
              disabled={option.listenId !== undefined}
            />
          </div>
        </div>
      </DraggableGraphNode>
    );
  }
}

export default Option;
