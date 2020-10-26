import React from "react";

import "./style.scss";

const App = ({ label, onChange, inBlock, type = 'text', readOnly = false, value }) => {
  return (
    <div className={`input ${inBlock ? "block" : ""}`}>
      <label className={`inlineLabel ${inBlock ? "blockLabel" : ""}`}>
        {label}
      </label>
      <input
        className={`inlineInput ${inBlock ? "blockInput" : ""}`}
        type={type}
        onChange={onChange}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
};

export default App;
