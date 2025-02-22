import React, { useState } from "react";
import "../component-css/Home.css";
import axios from "axios";
import QuantitativeForm from "./QuantitativeForm";
import QualitativeForm from "./QualitativeForm";

export default function Home() {
  const [category, setCategory] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
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
          <div className='stepZero'>
            <div id='left' className='left-section'>
              <div id='holder' className='holder'>
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
                      placeholder='Input a category (eg. Picking a Restaurant, Choosing a TV show)'
                      required
                    />
                    <input type='submit' onClick={handleLetsDecide} className='submit-button' disabled={!category.trim()} />
                  </form>
                </div>
              </div>
            </div>
            <div id='right' className='right-section'></div>
          </div>
        );
      case 1:
        return (
          <div className='stepZero'>
            <div id='left' className='left-section'>
              <button onClick={() => setStep(step - 1)} className='return'>
                {"<-"}
              </button>
              <button onClick={() => setStep(step + 1)} className='return'>
                {"->"}
              </button>
              <div id='holder' className='holder'>
                <div>
                  <div id='title' className='title'>
                    DECISION.IO
                  </div>
                  <div id='subtitile' className='description'>
                    A smart tool that harnesses AI and probability theory to mathematically help you make better decisions.
                  </div>
                </div>
              </div>
            </div>
            <div id='right' className='right-section'>
              <form className='form' action=''>
                <label className='select-label' htmlFor='category'>
                  Enter your decision category:
                </label>
                <input
                  className='select-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type='text'
                  name='category'
                  placeholder='Input a category (eg. Picking a Restaurant, Choosing a TV show)'
                  required
                />
                <input 
                  className='select-input'
                  value={satisfaction}
                  onChange={(e) => setSatisfaction(e.target.value)} 
                  type='text' 
                  placeholder='How satisfied are you? How risky is the new option?' required />
                <QuantitativeForm />
                <button onClick={handleLetsDecide} className='submit-button' disabled={!category.trim()}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            {" "}
            <button onClick={() => setStep(step - 1)} className='return'>
              {"<-"}
            </button>
            <div className='reportForm' style={{color: 'black'}}>
              <h1>Results</h1>
              <p>{category}</p>
              <p>{satisfaction}</p>
            </div>
          </div>
        );
      default:
        return <div>Invalid Step</div>;
    }
  };

  return <div className='home-container'>{renderStepContent()}</div>;
}
