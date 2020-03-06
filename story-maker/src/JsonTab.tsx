import React, { FunctionComponent } from "react";
import { Story } from "./types";

interface JsonTabProps {
  story: Story;
}

const JsonTab: FunctionComponent<JsonTabProps> = story => (
  <div>
    <p>{JSON.stringify(story)}</p>
  </div>
);

export default JsonTab;
