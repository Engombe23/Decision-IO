import React, { useState } from "react";
import "../component-css/Home.css";
import axios from "axios";

export default function Home() {
  const [category, setCategory] = useState("");
  const [transition, setTransition] = useState(false);
  const [parsedInitialQeustions, setParsedInitialQuestions] = useState([]);
  const [step, setStep] = useState(0);

  async function handleLetsDecide(e: React.FormEvent) {
    e.preventDefault();
    console.log(category);
    setStep(step + 1);
    // const data = await axios.post("...");
    //const parsedData = JOSN.parse(data.response);
    //setParsedInitialQuestions(parsedData);

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
                required
              />
              <input type='submit' onClick={handleLetsDecide} className='submit-button' disabled={!category.trim()} />
            </form>
          </div>
        );
      case 1:
        return (
          <div>
            <button onClick={() => setStep(step - 1)} className='return'>
              {"<-"}
            </button>
            <form>Step 2 Content</form>;
          </div>
        );

      case 2:
        return (
          <div>
            {" "}
            <button onClick={() => setStep(step - 1)} className='return'>
              {"<-"}
            </button>
            Step 3 Content
          </div>
        );
      case 3:
        return (
          <div>
            {" "}
            <button onClick={() => setStep(step - 1)} className='return'>
              {"<-"}
            </button>
            Step 3 Content
          </div>
        );
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
