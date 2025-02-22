require("dotenv").config();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Example POST endpoint
app.post("/api/category", async (req, res) => {
  try {
    const category = req.body.category;
    console.log(req.body.category);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const schema = {
      description: "Schema for gathering user input to determine explore vs. exploit probability",
      type: SchemaType.OBJECT,
      properties: {
        question1: {
          type: SchemaType.STRING,
          description: "A question asking how many times the user has done their familiar option in a reasonable time period",
          nullable: false,
        },
        question2: {
          type: SchemaType.STRING,
          description: "A question asking how satisfied the user is with their current choice (1-10)",
          nullable: false,
        },
        question3: {
          type: SchemaType.STRING,
          description: "A question about how adventurous the user is feeling regarding their category",
          nullable: false,
        },
        question4: {
          type: SchemaType.STRING,
          description: "A question asking what type of new thing would the user want to do, if any",
          nullable: false,
        },
      },
      required: ["question1", "question2", "question3", "question4"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      `You are an intelligent assistant designed to help users determine whether they should explore a new option or stick with their existing choice. Your task is to generate an object containing four *highly specific* questions based on the provided category.

**Context:**  
The user is trying to decide whether to *stick with a familiar option* (e.g., TV show, restaurant, investment, project, or date location) or *try something new* in the following scenario: ${category}.  

To determine the probability of exploring, we use the formula:  
\[
P(E) = \frac{T}{T + k}
\]
*(For reference only at the moment.)*  

### **Your Task:**  
Generate an object with **four highly specific, tailored questions** that help collect user input to calculate this probability. The questions must **explicitly reference details related to the category** and follow this structure:  

1. **Past behavior (T):** Ask how many times the user has **chosen this specific option in a reasonable timeframe**.  
2. **Satisfaction level:** Ask **how much they enjoy this specific option right now** (scale from 1-10).  
3. **Risk tolerance (k):** Ask **how willing they are to try something new** in this category.  
4. **Current mood:** Ask **what type of new experience they might be interested in**, if any.  

#### **Examples:**  
If the category is  **"Choosing a new TV show or sticking with Breaking Bad"**, the questions should be:  
json output - 
{
  "question1": "How many times have you chosen to rewatch Breaking Bad or continue watching it in the past month?",
  "question2": "On a scale from 1-10, how satisfied are you with watching Breaking Bad right now?",
  "question3": "How adventurous are you feeling today when it comes to trying a new TV show?",
  "question4": "If you were to watch something new, would you prefer something similar to Breaking Bad or a completely different genre?"
}`
    );
    console.log(result.response.text());
    res.json(JSON.stringify(result.response.text()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

app.post("/api/results", async (req, res) => {
  const userInput = req.body;
  console.log(userInput);
  try {
    const { category, example1, example2, example3, example4, parsedInitialQeustions } = req.body;

    // Extract individual questions
    const { question1, question2, question3, question4 } = parsedInitialQeustions;

    console.log("Category:", category);
    console.log("Example 1:", example1);
    console.log("Example 2:", example2);
    console.log("Example 3:", example3);
    console.log("Example 4:", example4);
    console.log("Question 1:", question1);
    console.log("Question 2:", question2);
    console.log("Question 3:", question3);
    console.log("Question 4:", question4);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const schema = {
      description: "Schema for scaling user responses (example1 - example4) for explore vs. exploit probability calculation",
      type: SchemaType.OBJECT,
      properties: {
        scaledExample1: {
          type: SchemaType.NUMBER,
          description: "Feature-scaled value (0-1) for example1, which represents past behavior.",
          minimum: 0,
          maximum: 1,
          nullable: false,
        },
        scaledExample2: {
          type: SchemaType.NUMBER,
          description: "Feature-scaled value (0-1) for example2, which represents satisfaction level.",
          minimum: 0,
          maximum: 1,
          nullable: false,
        },
        scaledExample3: {
          type: SchemaType.NUMBER,
          description: "Feature-scaled value (0-1) for example3, which represents risk tolerance.",
          minimum: 0,
          maximum: 1,
          nullable: false,
        },
        scaledExample4: {
          type: SchemaType.NUMBER,
          description: "Feature-scaled value (0-1) for example4, which represents openness to new experiences.",
          minimum: 0,
          maximum: 1,
          nullable: false,
        },
      },
      required: ["scaledExample1", "scaledExample2", "scaledExample3", "scaledExample4"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(`
      
    You are an intelligent assistant that processes user responses and normalizes them into a standardized range (0-1) for 
    probability calculations.

    ### **Task:**  
    Take the following user responses and **convert them into feature-scaled values between 0 and 1** for mathematical processing.

    ### **User Inputs:**  
    - **example1 (Past Behavior - Numeric Input)**: The number of times the user has chosen their existing option. **Higher values should 
    be scaled proportionally (e.g., 30 replays → closer to 1, 1 replay → closer to 0).**  
    - **example2 (Satisfaction - Scale 1-10)**: The user's rating of their current choice. **Convert to a range from 0 (not satisfied) to 1 
    (fully satisfied).**  
    - **example3 (Risk Tolerance - Text Input)**: A qualitative measure of risk (e.g., "not at all", "somewhat", "very"). **Map this to a 
    numerical scale (e.g., 'not at all' → 0, 'somewhat' → 0.5, 'very' → 1).**  
    - **example4 (Openness to New Experiences - Text Input)**: User preference for trying something new (e.g., "similar", "slightly different", 
    "completely different"). **Map this to a scale (e.g., 'similar' → 0, 'slightly different' → 0.5, 'completely different' → 1).**  

    ### **Important Rules:**  
    1. **Ensure all outputs are normalized between 0 and 1.**  
    2. **Use appropriate scaling methods based on the input type.**  
    3. **Maintain consistency across all examples to ensure accurate probability calculations.**`);
    console.log(result.response.text());

    // Parse AI response to JSON - need to actually check if this parses properly!!!!!!
    const scaledData = JSON.parse(aiResponse);

    // Extract feature-scaled values
    const T = scaledData.scaledExample1; // Number of times user chose familiar option (normalized)
    const satisfaction = scaledData.scaledExample2; // How much they enjoy it (for k)
    const riskTolerance = scaledData.scaledExample3; // How adventurous they are (for k)
    const opennessToNew = scaledData.scaledExample4; // Willingness to try new things (for k)

    // Calculate k dynamically (either fixed or based on normalized values)
    const k = calculateK(satisfaction, riskTolerance, opennessToNew);

    function calculateK(satisfaction, riskTolerance, opennessToNew) {
      // Adjust weighting based on priority of factors
      const weightSatisfaction = 1 - satisfaction; // If satisfied, k should be higher (less exploration)
      const weightRisk = riskTolerance; // If user is adventurous, k should be lower (more exploration)
      const weightOpenness = opennessToNew; // If highly open to new, k should be lower (more exploration)

      // Normalize and combine factors
      const k = weightSatisfaction * 0.5 + weightRisk * 0.3 + weightOpenness * 0.2;

      // Ensure k is within a reasonable range to prevent divide-by-zero errors
      return Math.max(k, 0.1); // Prevent k from being too small
    }

    // Compute exploration probability
    const P_E = T / (T + k);
    const P_X = 1 - P_E; // Probability of exploiting (sticking with known option)
    let shouldTry;

    if (P_E >= 0.5) {
      shouldTry = true;
    } else {
      shouldTry = false;
    }

    const finalResultObject = {
      shouldTry: shouldTry,
      P_E: P_E,
      T: T,
      k: k,
      satisfaction: satisfaction,
      riskTolerance: riskTolerance,
      opennessToNew: opennessToNew,
      resultTitle: "none",
      subtitle: "none",
      decision: "none",
      explaination: "none",
      recommendations: "none",
    };

    res.json(JSON.stringify(finalResultObject));
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
