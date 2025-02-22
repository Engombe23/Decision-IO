import React, {useState} from "react";

export default function QuantitativeForm() {
  const [times, setTimes] = useState("");
  return <div>
    <input
      className='select-input'
      type='text'
      value={times}
      onChange={(e) => setTimes(e.target.value)}
      placeholder='How many times have you chosen this activity?'
      required
    />
  </div>;
}
