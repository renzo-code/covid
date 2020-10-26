import React from "react";

// import "./style.scss";

const App = ({ label, onChange, inBlock, type = 'text', readOnly = false, value }) => {
  return (
    <div className={`input ${inBlock ? "block" : ""}`}>
      <label className={`inlineLabel ${inBlock ? "blockLabel" : ""}`}>
        {label}
      </label>
      <textarea
        className={`inlineInput ${inBlock ? "blockInput" : ""}`}
        type={type}
        onChange={onChange}
        readOnly={readOnly}
        value={value}
        rows="5"
      >
      </textarea>
    </div>
  );
};

export default App;
