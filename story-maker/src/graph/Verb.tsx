import React, { FunctionComponent } from "react";
import { Verb } from "../types";

interface VerbProps {
  verb: Verb;
  addVerb(verb: Verb): void;
}

const VerbComponent: FunctionComponent<VerbProps> = ({ verb, addVerb }) => (
  <div className="verb">
    <p>{verb}</p>
    <button onClick={() => addVerb(verb)}>+</button>
  </div>
);

export default VerbComponent;
