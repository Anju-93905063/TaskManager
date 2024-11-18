import React from "react";

const ProgressChart = ({ progress }) => {
  return (
    <div className="mb-4">
      <h4>Task Completion Progress</h4>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
