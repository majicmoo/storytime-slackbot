import React from "react";
import { Story } from "./types";
import { validate } from "./ValidateStoryJson";
import classnames from "classnames";
import { saveAs } from "file-saver";

interface JsonTabProps {
  story: Story;
  updateStory(story: Story): void;
}

interface JsonTabState {
  error: boolean;
  updatedJson: string;
  copied: boolean;
}

class JsonTab extends React.Component<JsonTabProps, JsonTabState> {
  constructor(props: JsonTabProps) {
    super(props);
    this.state = {
      error: false,
      updatedJson: JSON.stringify(props.story),
      copied: false
    };
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
    this.setState({ updatedJson: json, error: false, copied: false });
    try {
      const parsedJson = JSON.parse(json);
      validate(parsedJson);
      this.props.updateStory(parsedJson);
    } catch (e) {
      this.setState({ error: true });
    }
  };

  private copy = () => {
    navigator.clipboard.writeText(JSON.stringify(this.props.story));
    this.setState({ copied: true });
  };

  private download = () => {
    var blob = new Blob([JSON.stringify(this.props.story)], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "story.json");
  };

  public render() {
    const { error, updatedJson, copied } = this.state;
    return (
      <div className="json-tab">
        <div className="json-top-bar">
          <p className="export-wrapper">
            <button onClick={this.download} className="json-button-export">
              <i className="fas fa-download" />
            </button>{" "}
            <button onClick={this.copy} className="json-button-export">
              <i className="fas fa-copy" />
            </button>{" "}
            {copied && "Copied"}
          </p>
          <p
            className={classnames("valid-checker", {
              "valid-checker--valid": !error
            })}
          >
            Valid {error && <i className="fas fa-times-circle" />}
            {!error && <i className="fas fa-check-circle" />}
          </p>
        </div>
        <div className="json-wrapper">
          <textarea
            className="json--text-area"
            value={updatedJson}
            onChange={e => this.validateJson(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default JsonTab;
