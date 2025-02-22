require('dotenv').config();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Example POST endpoint
app.post("/api/category", async (req, res) => {
  try {
    const category = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    
    const schema = {
      description: "Schema for gathering user input to determine explore vs. exploit probability",
      type: SchemaType.OBJECT,
      properties: {
        question1: {
          type: SchemaType.STRING,
          description: "How many times have you chosen your existing option in this category before?",
          nullable: false,
        },
        question2: {
          type: SchemaType.STRING,
          description: "How satisfied are you with your current choice on a scale from 1-10?",
          nullable: false,
        },
        question3: {
          type: SchemaType.STRING,
          description: "How adventurous are you feeling today regarding this category?",
          nullable: false,
        },
        question4: {
          type: SchemaType.STRING,
          description: "What level of risk are you comfortable with for trying something new (low, medium, high)?",
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
      `You are an intelligent assistant designed to help users determine whether they should explore a new option or stick with their
      existing choice. Your task is to generate an object containing four context-specific questions that align with the explore-exploit 
      decision framework.

      *Context:*    
      The user is trying to decide whether to *stick with a familiar option* (e.g., TV show, restaurant, investment, project, or date location) 
      or *try something new* in the following category: ${category}. To determine the probability of exploring, the following formula is used (for reference only at the moment):  
      \[
      P(E) = \frac{T}{T + k}
      \]
      Where:  
      - *P(E)* = Probability of exploring  
      - *T* = Number of times the user has previously chosen this option  
      - *k* = A constant that adjusts how quickly the user shifts from exploring to exploiting  

      ### *Your Task:*  
      Generate an object with *four questions* that help collect the necessary user input to calculate this probability. The questions should be specific and structured to capture:  
      1. *Past behavior (T):* How many times the user has chosen their existing option.  
      2. *Satisfaction level:* How happy they are with their current choice.  
      3. *Risk tolerance (k):* Their willingness to try something new.  
      4. *Current mood:* How adventurous they feel at the moment. `
    );
    console.log(result.response.text());
    res.json(JSON.stringify(result.response.text()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
