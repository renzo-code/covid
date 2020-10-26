import React from "react";

import "./style.scss";

const App = ({ label = null, onChange, inBlock, readOnly = false, value, selected }) => {
  return (
    <div className={`combo ${inBlock ? "block" : ""} ${label ? '' : 'cbox-center'}`}>
      {label && (
        <label className={`inlineLabel ${inBlock ? "blockLabel" : ""}`}>
          {label}
        </label>
      )}
      <select
        className={`inlineInput ${inBlock ? "blockInput" : ""}`}
        onChange={onChange}
        disabled={readOnly}
        value={selected}
      >
        {value.map(({id, name}, i) => (
          <option value={id} key={i}>{name}</option>
        ))}
      </select>
    </div>
  );
};

export default App;