import React from "react";
import { Story } from "./types";
import { validate } from "./ValidateStoryJson";
import classnames from "classnames";
interface JsonTabProps {
  story: Story;
  updateStory(story: Story): void;
}

interface JsonTabState {
  error: boolean;
  updatedJson: string;
}

class JsonTab extends React.Component<JsonTabProps, JsonTabState> {
  constructor(props: JsonTabProps) {
    super(props);
    this.state = { error: false, updatedJson: JSON.stringify(props.story) };
  }

  public componentDidUpdate(prevProps: JsonTabProps) {
    if (prevProps.story !== this.props.story) {
      this.setState({
        error: false,
        updatedJson: JSON.stringify(this.props.story)
      });
    }
  }
  private validateJson = (json: string) => {
    this.setState({ updatedJson: json, error: false });
    try {
      const parsedJson = JSON.parse(json);
      validate(parsedJson);
      this.props.updateStory(parsedJson);
    } catch (e) {
      this.setState({ error: true });
    }
  };

  public render() {
    const { error, updatedJson } = this.state;
    return (
      <div>
        <p
          className={classnames("valid-checker", {
            "valid-checker--valid": !error
          })}
        >
          Valid {error && <i className="fas fa-times-circle" />}
          {!error && <i className="fas fa-check-circle" />}
        </p>
        <div className="json-wrapper">
          <code>
            <textarea
              className="json"
              value={updatedJson}
              onChange={e => this.validateJson(e.target.value)}
            />
          </code>
        </div>
      </div>
    );
  }
}

export default JsonTab;
