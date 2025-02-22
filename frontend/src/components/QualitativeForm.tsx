import React from "react";

export default function QualitativeForm() {
  return <div>
    <textarea wrap="soft"
      className='select-input'
      placeholder='How satisfied are you? How risky is the new option?'
      required
    />
  </div>;
}
