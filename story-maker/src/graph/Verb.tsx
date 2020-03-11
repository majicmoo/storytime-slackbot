import React, { FunctionComponent } from "react";
import { Verb } from "../types";
import NodeAdder from "./NodeAdder";

interface VerbProps {
  verb: Verb;
  addVerb(verb: Verb): void;
  disabled: boolean;
}

const VerbComponent: FunctionComponent<VerbProps> = ({
  verb,
  addVerb,
  disabled
}) => (
  <div className="verb">
    <p>{verb}</p>
    {!disabled && <NodeAdder onClick={() => addVerb(verb)} />}
  </div>
);

export default VerbComponent;
