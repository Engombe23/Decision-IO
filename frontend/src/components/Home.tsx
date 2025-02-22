import React, { useState } from "react";
import "../component-css/Home.css";
import axios from "axios";

export default function Home() {
  const [category, setCategory] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [transition, setTransition] = useState(false);
  const [parsedInitialQeustions, setParsedInitialQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [numTypesDone, setNumTypesDone] = useState(0);
  const [example1, setExample1] = useState("");
  const [example2, setExample2] = useState("");
  const [example3, setExample3] = useState("");

  async function handleLetsDecide(e: React.FormEvent) {
    e.preventDefault();
    console.log(category);
    setStep(step + 1);
    const data = await axios.post("http://localhost:8000/api/category");
    console.log(data);
    // const parsedData = JSON.parse(data);
    // setParsedInitialQuestions(parsedData);
    setTransition(true);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("form has been submitted");
    setStep(step + 1);
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
                    <textarea
                      wrap='soft'
                      className='select-input'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
          <div className='stepOne'>
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
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name='category'
                  placeholder='Input a category (eg. Picking a Restaurant, Choosing a TV show)'
                  required
                />
                <label className='select-label' htmlFor='satisfaction'>
                  example text
                </label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  placeholder='How much do you want to try a new option?'
                  required
                />
                <label className='select-label' htmlFor='numTypesDone'>
                  example text
                </label>
                <input
                  className='select-input'
                  value={numTypesDone}
                  onChange={(e) => setNumTypesDone(Number(e.target.value))}
                  type='number'
                  min={0}
                  name='numTypesDone'
                  placeholder='How many times have you chosen this activity?'
                  required
                />{" "}
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example1} onChange={(e) => setExample1(e.target.value)} />
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example2} onChange={(e) => setExample2(e.target.value)} />
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example3} onChange={(e) => setExample3(e.target.value)} />
                <label htmlFor=''>example</label>
                {/* google search thing goes here */}
                <button onClick={handleFormSubmit} className='submit-button' disabled={!category.trim()}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        );

      case 2:
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

                <div className='reportForm' style={{ color: "black" }}>
                  <h1>Results</h1>
                  <p>{category}</p>
                  <p>{satisfaction}</p>
                </div>
              </div>
            </div>
            <div id='right' className='right-section'>
              <form className='form' action=''>
                <label className='select-label' htmlFor='category'>
                  Enter your decision category:
                </label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name='category'
                  placeholder='Input a category (eg. Picking a Restaurant, Choosing a TV show)'
                  required
                />
                <label className='select-label' htmlFor='satisfaction'>
                  example text
                </label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  placeholder='How much do you want to try a new option?'
                  required
                />
                <label className='select-label' htmlFor='numTypesDone'>
                  example text
                </label>
                <input
                  className='select-input'
                  value={numTypesDone}
                  onChange={(e) => setNumTypesDone(Number(e.target.value))}
                  type='number'
                  min={0}
                  name='numTypesDone'
                  placeholder='How many times have you chosen this activity?'
                  required
                />{" "}
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example1} onChange={(e) => setExample1(e.target.value)} />
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example2} onChange={(e) => setExample2(e.target.value)} />
                <label htmlFor=''>example</label>
                <textarea wrap='soft' className='select-input' value={example3} onChange={(e) => setExample3(e.target.value)} />
                <label htmlFor=''>example</label>
                {/* google search thing goes here */}
                <button onClick={handleFormSubmit} className='submit-button' disabled={!category.trim()}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return <div>Invalid Step</div>;
    }
  };

  return <div className='home-container'>{renderStepContent()}</div>;
}
