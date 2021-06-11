import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <div className="finished">
        <div>
          <h4>Finished!</h4>
          <p>Thank you for participating! Your completion code is: <b>1A456505</b></p>
        </div>
      </div>
    );
  }
}
