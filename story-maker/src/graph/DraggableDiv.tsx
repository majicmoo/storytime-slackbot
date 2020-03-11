import React, { createRef, RefObject, ReactNode } from "react";
import classnames from "classnames";

interface DraggableDivProps {
  x: number;
  y: number;
  children: ReactNode;
  onUpdatePosition(x: number, y: number, width: number, height: number): void;
}

interface DraggableDivState {
  x: number;
  y: number;
  dragging: boolean;
  relX: number;
  relY: number;
}

class DraggableDiv extends React.Component<
  DraggableDivProps,
  DraggableDivState
> {
  private ref: RefObject<HTMLDivElement> = createRef();
  constructor(props: DraggableDivProps) {
    super(props);
    this.state = { x: props.x, y: props.y, dragging: false, relX: 0, relY: 0 };
  }

  public componentDidMount() {
    this.props.onUpdatePosition(
      this.props.x,
      this.props.y,
      this.width(),
      this.height()
    );
  }

  public componentDidUpdate(
    props: DraggableDivProps,
    state: DraggableDivState
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

export default DraggableDiv;
