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
  drawing: boolean;
}

class Connector extends React.Component<ConnectorProps> {
  public componentDidUpdate(props: ConnectorProps) {
    if (this.props.drawing && !props.drawing) {
      document.addEventListener("mousemove", this.mouseMove);
      document.addEventListener("mouseup", this.stopDrawing);
    } else if (!this.props.drawing && props.drawing) {
      document.removeEventListener("mousemove", this.mouseMove);
      document.removeEventListener("mouseup", this.stopDrawing);
    }
  }

  private startDrawing = (e: React.MouseEvent<HTMLDivElement>) => {
    this.drawLine(e as any);
  };

  private stopDrawing = () => {
    this.props.stopDrawingLine();
  };

  private mouseMove = (e: MouseEvent) => {
    if (this.props.drawing) {
      this.drawLine(e);
      const overlappingNode = this.props.nodeTrackers.find(
        n =>
          n.id !== this.props.nodeTracker.id &&
          n.type === this.props.canCollideWith &&
          n.x < e.pageX &&
          e.pageX < n.x + n.width &&
          n.y < e.pageY &&
          e.pageY < n.y + n.height
      );

      if (overlappingNode) {
        this.props.onCollision(overlappingNode.id);
      }
    }
  };

  private drawLine = (e: MouseEvent) => {
    const { drawFrom, nodeTracker } = this.props;
    const y1 =
      drawFrom === "top" ? nodeTracker.y : nodeTracker.y + nodeTracker.height;

    this.props.drawLine({
      x1: this.props.nodeTracker.x,
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
