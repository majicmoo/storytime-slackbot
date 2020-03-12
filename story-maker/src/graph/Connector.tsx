import React, { ReactNode } from "react";
import { NodeTracker, NodeTrackerType, LineCoordinates } from "../types";

interface ConnectorProps {
  children: ReactNode;
  nodeTracker: NodeTracker;
  nodeTrackers: NodeTracker[];
  drawFrom: "bottom" | "top";
  canCollideWith: NodeTrackerType;
  onCollision(id: string): void;
  drawLine(lineCoordinates: LineCoordinates): void;
  stopDrawingLine(): void;
}

interface ConnectorState {
  active: boolean;
}

class Connector extends React.Component<ConnectorProps, ConnectorState> {
  public state = { active: false };
  public componentDidUpdate(props: ConnectorProps, state: ConnectorState) {
    if (this.state.active && !state.active) {
      document.addEventListener("mousemove", this.mouseMove);
      document.addEventListener("mouseup", this.stopDrawing);
    } else if (!this.state.active && state.active) {
      document.removeEventListener("mousemove", this.mouseMove);
      document.removeEventListener("mouseup", this.stopDrawing);
    }
  }

  private startDrawing = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(this.props.nodeTracker.id);
    this.setState({ active: true });
    this.drawLine(e as any);
  };

  private stopDrawing = (e: MouseEvent) => {
    this.setState({ active: false });

    const overlappingNode = this.props.nodeTrackers.find(
      n =>
        n.id !== this.props.nodeTracker.id &&
        n.type === this.props.canCollideWith &&
        n.x < e.pageX &&
        e.pageX < n.x + n.width &&
        n.y < e.pageY &&
        e.pageY < n.y + n.height
    );
    console.log(overlappingNode);

    if (overlappingNode) {
      this.props.onCollision(overlappingNode.id);
    }
    this.props.stopDrawingLine();
  };

  private mouseMove = (e: MouseEvent) => {
    if (this.state.active) {
      this.drawLine(e);
    }
  };

  private drawLine = (e: MouseEvent) => {
    const { drawFrom, nodeTracker } = this.props;
    const y1 =
      drawFrom === "top" ? nodeTracker.y : nodeTracker.y + nodeTracker.height;

    this.props.drawLine({
      x1: this.props.nodeTracker.x + this.props.nodeTracker.width / 2,
      y1: y1,
      x2: e.pageX,
      y2: e.pageY
    });
  };

  public render() {
    const { children } = this.props;

    return <div onMouseDown={this.startDrawing}>{children}</div>;
  }
}

export default Connector;
