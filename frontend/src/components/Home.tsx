import React, { useState } from "react";
import "../component-css/Home.css";
import axios from "axios";

export default function Home() {
  const [category, setCategory] = useState("");
  const [transition, setTransition] = useState(false);
  const [step, setStep] = useState(0);

  async function handleLetsDecide(e: React.FormEvent) {
    e.preventDefault();
    console.log(category);
    setStep(step + 1);
    // const data = await axios.post("...");
    setTransition(true);
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <div id='title' className='title'>
              DECISION.IO
            </div>
            <div id='subtitile' className='description'>
              A smart tool that harnesses AI and probability theory to mathematically help you make better decisions.
            </div>
            <form className='form' action=''>
              <input
                className='select-input'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type='text'
                name='category'
                placeholder='Input a category (eg. Picking a Resteraunt, Choosing a TV show)'
              />
              <button onClick={handleLetsDecide} className='submit-button'>
                Let's Decide...
              </button>
            </form>
          </div>
        );
      case 1:
        return <div>Step 2 Content</div>;
      case 2:
        return <div>Step 3 Content</div>;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className='home-container'>
      <div id='left' className='left-section'>
        <div id='holder' className='holder'>
          {renderStepContent()}
        </div>
      </div>
      <div id='right' className='right-section'></div>
    </div>
  );
}
