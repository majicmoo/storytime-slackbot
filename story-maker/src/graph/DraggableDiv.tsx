import React, { createRef, RefObject, ReactNode } from "react";

interface DraggableDivProps {
  x: number;
  y: number;
  children: ReactNode;
  className: string;
  onUpdatePosition(x: number, y: number): void;
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
    this.props.onUpdatePosition(this.props.x, this.props.y);
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
    console.log("click");
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
      this.props.onUpdatePosition(x, y);
    }
  };

  public render() {
    const { children, className } = this.props;
    const { x, y } = this.state;

    return (
      <div
        className={className}
        style={{ left: `${x}px`, top: `${y}px` }}
        onMouseDown={this.startDragging}
        ref={this.ref}
      >
        {children}
      </div>
    );
  }
}

export default DraggableDiv;
