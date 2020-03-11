import React, { FunctionComponent } from "react";
import { Verb } from "../types";

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
    {!disabled && <button onClick={() => addVerb(verb)}>+</button>}
  </div>
);

export default VerbComponent;
