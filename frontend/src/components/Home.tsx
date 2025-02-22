import React from "react";
import "../component-css/Home.css";

export default function Home() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <div className='home-container'>
      <div id='left' className='left-section'>
        <div id='form'>
          <div id='title' className='title'></div>
          <div id='subtitile' className='description'></div>
          <div>
            <form className='form' action=''>
              <input type='dropdown' className='select-input' />
              <button onClick={handleSubmit} className='submit-button'></button>
            </form>
          </div>
        </div>
      </div>
      <div id='right' className='right-section'></div>
    </div>
  );
}
