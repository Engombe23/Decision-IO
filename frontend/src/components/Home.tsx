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
  const [loading, setLoading] = useState(false);

  const [finalReportObject, setFinalReportObject] = useState<{
    shouldTry: boolean;
    P_E: number;
    T: number;
    k: number;
    satisfaction: number;
    riskTolerance: number;
    opennessToNew: number;
    resultTitle: string;
    subtitle: string;
    decision: string;
    explaination: string;
    recommendations: string;
  } | null>(null);

  async function handleLetsDecide(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = await axios.post("http://localhost:8000/api/category", { category });
    const parsedData = JSON.parse(JSON.parse(data.data));
    setParsedInitialQuestions(parsedData);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    setStep(step + 1);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const finalResults = await axios.post("http://localhost:8000/api/results", {
      category,
      example1,
      example2,
      example3,
      example4,
      parsedInitialQeustions,
      location,
    });
    setFinalReportObject(JSON.parse(finalResults.data));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoading(false);

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
                  <div id='subtitile' style={{ marginBottom: "20px" }} className='description'>
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
                    <input
                      type='submit'
                      onClick={handleLetsDecide}
                      value={loading ? "loading..." : "Submit"}
                      className='submit-button'
                      disabled={!category.trim()}
                    />
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
              <button onClick={() => setStep(step - 1)} className='return'>
                {"<-"}
              </button>
              <form className='form' action=''>
                <label htmlFor='category'>Enter some details about your decision:</label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name='category'
                  placeholder='Input a bit of info about your decision (eg. Picking a Restaurant, Choosing a TV show)'
                  required
                />
                <label htmlFor='satisfaction'>How much do you want to try a new option?</label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  required
                />
                <label htmlFor='example1'>{parsedInitialQeustions?.question1}</label>
                <input className='select-input' value={example1} onChange={(e) => setExample1(e.target.value)} type='number' min={0} name='example1' required />
                <label htmlFor=''>{parsedInitialQeustions?.question2}</label>
                <input type='number' className='select-input' value={example2} onChange={(e) => setExample2(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question3}</label>
                <textarea wrap='soft' className='select-input' value={example3} onChange={(e) => setExample3(e.target.value)} />
                <label htmlFor=''>{parsedInitialQeustions?.question4}</label>
                <textarea wrap='soft' className='select-input' value={example4} onChange={(e) => setExample4(e.target.value)} />
                <label htmlFor=''>Enter Your location so we can give you accurate reccomendations.</label>
                <textarea wrap='soft' className='select-input' value={location} onChange={(e) => setLocation(e.target.value)} />
                <button onClick={handleFormSubmit} value={loading ? "Calculating" : "Submit"} className='submit-button' disabled={!category.trim()}>
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
                  <h2>{finalReportObject?.resultTitle}</h2>
                  <h3>{finalReportObject?.subtitle}</h3>
                  <p>
                    <strong>Decision:</strong> {finalReportObject?.decision}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {finalReportObject?.explaination}
                  </p>
                  <p>
                    <strong>Recommendations:</strong> {finalReportObject?.recommendations}
                  </p>
                  <h2>Statistical Analysis</h2>
                  <p>
                    <strong>Probability of Exploring (P_E):</strong> {finalReportObject?.P_E !== undefined ? finalReportObject.P_E.toFixed(3) : "N/A"}
                  </p>
                  <p>
                    <strong>Times Chosen Existing Option (T):</strong> {finalReportObject?.T !== undefined ? finalReportObject.T.toFixed(3) : "N/A"}
                  </p>
                  <p>
                    <strong>Exploration Adjustment Constant (k):</strong> {finalReportObject?.k !== undefined ? finalReportObject.k.toFixed(3) : "N/A"}
                  </p>
                  <p>
                    <strong>Satisfaction Level:</strong> {finalReportObject?.satisfaction !== undefined ? Number(finalReportObject.satisfaction) : "N/A"}
                  </p>
                  <p>
                    <strong>Risk Tolerance:</strong> {finalReportObject?.riskTolerance !== undefined ? Number(finalReportObject.riskTolerance) : "N/A"}
                  </p>
                  <p>
                    <strong>Openness to New Experiences:</strong>{" "}
                    {finalReportObject?.opennessToNew !== undefined ? Number(finalReportObject.opennessToNew) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div id='right' className='right-section'>
              <button onClick={() => setStep(step - 1)} className='return'>
                {"<-"}
              </button>
              <form className='form' action=''>
                <label htmlFor='category'>Enter some details about your decision:</label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name='category'
                  placeholder='Input some details about your decision (eg. Picking a Restaurant, Choosing a TV show)'
                  required
                />
                <label htmlFor='satisfaction'>How much do you want to try a new option?</label>
                <textarea
                  wrap='soft'
                  className='select-input'
                  value={satisfaction}
                  name='satisfaction'
                  onChange={(e) => setSatisfaction(e.target.value)}
                  required
                />
                <label htmlFor='example1'>{parsedInitialQeustions?.question1}</label>
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
