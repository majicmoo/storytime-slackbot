import React, { createRef, RefObject, ReactNode } from "react";
import classnames from "classnames";
import { NodeTracker } from "../types";
import { reduce } from "ramda";

interface DraggableGraphNodeProps {
  children: ReactNode;
  onUpdatePosition(x: number, y: number, width: number, height: number): void;
  nodeTrackers: NodeTracker[];
  id: string;
}

interface NextPosition {
  biggestX: number;
  biggestY: number;
  height: number;
}

interface DraggableGraphNodeState {
  x: number;
  y: number;
  dragging: boolean;
  relX: number;
  relY: number;
}

class DraggableGraphNode extends React.Component<
  DraggableGraphNodeProps,
  DraggableGraphNodeState
> {
  private ref: RefObject<HTMLDivElement> = createRef();
  constructor(props: DraggableGraphNodeProps) {
    super(props);
    this.state = { x: 0, y: 0, dragging: false, relX: 0, relY: 0 };
  }

  public componentDidMount() {
    if (this.props.nodeTrackers.length === 0) {
      this.props.onUpdatePosition(0, 0, this.width(), this.height());
      return;
    }

    const maybeEntry = this.props.nodeTrackers.find(
      n => n.id === this.props.id
    );
    if (maybeEntry !== undefined) {
      this.setState({ x: maybeEntry.x, y: maybeEntry.y });
      return;
    }

    const { biggestX, biggestY, height } = reduce<NodeTracker, NextPosition>(
      (acc: NextPosition, next: NodeTracker) => {
        let biggestX = acc.biggestX;
        let biggestY = acc.biggestY;
        let height = acc.height;

        if (next.y >= biggestY) {
          biggestY = next.y;
          height = next.height;
        }

        return { biggestX, biggestY, height };
      },
      { biggestX: 0, biggestY: 0, height: 0 }
    )(this.props.nodeTrackers);

    const x = biggestX;
    const y = biggestY + height;

    this.setState({ x, y });

    this.props.onUpdatePosition(x, y, this.width(), this.height());
    setTimeout(() => this.ref.current?.scrollIntoView());
  }

  public componentDidUpdate(
    props: DraggableGraphNodeProps,
    state: DraggableGraphNodeState
  ) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDragging);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDragging);
    }
  }

  private startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.ref.current) {
      this.setState({
        dragging: true,
        relX: e.pageX - this.ref.current.offsetLeft,
        relY: e.pageY - this.ref.current.offsetTop
      });
    }
  };

  private stopDragging = () => {
    this.setState({ dragging: false });
  };

  private drag = (e: MouseEvent) => {
    const x = e.pageX - this.state.relX;
    const y = e.pageY - this.state.relY;
    if (this.state.dragging) {
      this.setState({ x, y });
      this.props.onUpdatePosition(x, y, this.width(), this.height());
    }
  };

  private width = (): number => this.ref.current?.clientWidth || 0;
  private height = (): number => this.ref.current?.clientHeight || 0;

  public render() {
    const { children } = this.props;
    const { x, y, dragging } = this.state;

    return (
      <div
        className={classnames("draggable-div", {
          "draggable-div--dragging": dragging
        })}
        style={{ left: `${x}px`, top: `${y}px` }}
        ref={this.ref}
      >
        <div className="drag-wrapper" onMouseDown={this.startDragging}>
          <i className="fas fa-arrows-alt" title="move node"></i>
        </div>
        {children}
      </div>
    );
  }
}

export default DraggableGraphNode;
