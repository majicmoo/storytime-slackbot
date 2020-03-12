import React, { FunctionComponent } from "react";
import Line from "./Line";

interface ConnectorArrowProps {
  drawing: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const ConnectorArrow: FunctionComponent<ConnectorArrowProps> = ({
  drawing,
  x1,
  y1,
  x2,
  y2
}) => (
  <>{drawing && <Line position="absolute" x1={x1} y1={y1} x2={x2} y2={y2} />}</>
);

export default ConnectorArrow;
