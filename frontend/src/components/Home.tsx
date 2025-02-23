import React, { useState } from "react";
import "../component-css/Home.css";
import axios from "axios";

export default function Home() {
  const [category, setCategory] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [parsedInitialQeustions, setParsedInitialQuestions] = useState<{
    question1: string;
    question2: string;
    question3: string;
    question4: string;
  }>();
  const [step, setStep] = useState(0);
  const [example1, setExample1] = useState("");
  const [example2, setExample2] = useState("");
  const [example3, setExample3] = useState("");
  const [example4, setExample4] = useState("");
  const [location, setLocation] = useState("");

  async function handleLetsDecide(e: React.FormEvent) {
    e.preventDefault();
    console.log(category);
    setStep(step + 1);
    const data = await axios.post("http://localhost:8000/api/category", { category });
    const parsedData = JSON.parse(JSON.parse(data.data));
    console.log(`client side data:`);
    console.log(parsedData);
    setParsedInitialQuestions(parsedData);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    /*const results = await axios.post("http://localhost:8000/api/results", {
      category,
      example1,
      example2,
      example3,
      example4,
      parsedInitialQeustions,
    });*/

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
                  How much do you want to try a new option?
                </label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  required
                />
                <label className='select-label' htmlFor='example1'>
                  {parsedInitialQeustions?.question1}
                </label>
                <input className='select-input' value={example1} onChange={(e) => setExample1(e.target.value)} type='number' min={0} name='example1' required />
                <label htmlFor=''>{parsedInitialQeustions?.question2}</label>
                <input type='number' className='select-input' value={example2} onChange={(e) => setExample2(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question3}</label>
                <textarea wrap='soft' className='select-input' value={example3} onChange={(e) => setExample3(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question4}</label>
                <textarea wrap='soft' className='select-input' value={example4} onChange={(e) => setExample4(e.target.value)} />
                <label htmlFor=''>Enter Your location so we can give you accurate reccomendations.</label>
                <textarea wrap='soft' className='select-input' value={location} onChange={(e) => setLocation(e.target.value)} />
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
                {"⬅️"}
              </button>
              <button onClick={() => setStep(step + 1)} className='return'>
                {"➡️"}
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
                  {/* results: should you ... or ... keep it specific to the category */}
                  <p>Category: {category}</p>
                  {/* subtitle: add a little bit of subtext maybe? */}
                  <p>Statistical Analysis of Probability:</p>
                  {/* add in the P value and other stats*/}
                  <p>Outcome:</p>
                  {/* add in the stat outcome as a text */}
                  <p>Explaination:</p>
                  {/* give an explaination for the outcome */}
                  <p>Recommendations:</p>
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
                  How much do you want to try a new option?
                </label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  required
                />
                <label className='select-label' htmlFor='example1'>
                  {parsedInitialQeustions?.question1}
                </label>
                <input className='select-input' value={example1} onChange={(e) => setExample1(e.target.value)} type='number' min={0} name='example1' required />
                <label htmlFor=''>{parsedInitialQeustions?.question2}</label>
                <input type='number' className='select-input' value={example2} onChange={(e) => setExample2(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question3}</label>
                <textarea wrap='soft' className='select-input' value={example3} onChange={(e) => setExample3(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question4}</label>
                <textarea wrap='soft' className='select-input' value={example4} onChange={(e) => setExample4(e.target.value)} />
                <label htmlFor=''>Enter Your location so we can give you accurate reccomendations.</label>
                <textarea wrap='soft' className='select-input' value={location} onChange={(e) => setLocation(e.target.value)} />
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
