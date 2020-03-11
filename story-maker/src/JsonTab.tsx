import React, { FunctionComponent } from "react";
import { Story } from "./types";

interface JsonTabProps {
  story: Story;
}

const JsonTab: FunctionComponent<JsonTabProps> = story => (
  <div className="json">
    <code>{JSON.stringify(story)}</code>
  </div>
);

export default JsonTab;
