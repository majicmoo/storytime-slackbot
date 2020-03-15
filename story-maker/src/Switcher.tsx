import React, { FunctionComponent } from "react";
import classnames from "classnames";
export type Tab = "graph" | "json" | "chat" | "info";

interface SwitcherProps {
  update(tab: Tab): void;
  tab: Tab;
  icon: string;
  currentTab: Tab;
}
const Switcher: FunctionComponent<SwitcherProps> = ({
  update,
  tab,
  icon,
  currentTab
}) => (
  <button
    className={classnames("switcher", {
      "switcher--selected": tab === currentTab
    })}
    title="info"
    onClick={() => update(tab)}
  >
    <i className={icon} />
  </button>
);

export default Switcher;
