# Decision.io - AI-Powered Decision Making Tool

## Overview

Decision.io is an intelligent web application that helps users make better decisions using AI and probability theory. It guides users through a structured decision-making process to determine whether they should explore new options or stick with familiar choices.

## Key Features

- AI-powered decision analysis
- Probability-based recommendations
- Personalized suggestions based on user inputs
- Interactive multi-step interface
- Statistical analysis of decision factors

## Technology Stack

### Frontend

- React (TypeScript)
- CSS for styling
- Axios for API calls

### Backend

- Node.js with Express
- Google Generative AI (Gemini)
- CORS for cross-origin requests

## Project Structure

frontend/
├── src/
│ ├── components/
│ │ └── Home.tsx
│ ├── component-css/
│ │ └── Home.css
│ ├── App.tsx
│ ├── index.tsx
│ └── ... (other React files)
backendII/
├── server.js
└── package.json

## Installation

1. Clone the repository
   git clone https://github.com/yourusername/decision-io.git
   cd decision-io

2. Install frontend dependencies
   cd frontend
   npm install

3. Install backend dependencies
   cd ../backendII
   npm install

4. Create a .env file in the backend directory with your Google API key:
   API_KEY=your_google_api_key_here

## Running the Application

1. Start the backend server
   cd backendII
   npm start

2. Start the frontend development server
   cd ../frontend
   npm start

3. Access the application at http://localhost:3000

## Key Components

### Frontend

- **Home Component**: Main interface for user interaction
- **CSS Styling**: Custom styles for the application

### Backend

- **Server**: Handles API requests and AI processing

## Decision Making Process

1. User inputs a decision category
2. AI generates specific questions based on the category
3. User answers the questions
4. System calculates exploration probability using the formula:
   P(E) = T / (T + k)
   Where:

   - T = Number of times user chose familiar option
   - k = Exploration adjustment constant

5. AI generates personalized recommendations based on the analysis

## API Endpoints

- **POST /api/category**: Generates decision-specific questions
- **POST /api/results**: Processes user inputs and returns decision analysis

## Contributing

1. Fork the repository
2. Create a new branch (git checkout -b feature/YourFeatureName)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeatureName)
5. Open a pull request

## License

MIT License

## Acknowledgements

- Google Generative AI for the AI capabilities
- React and Node.js communities for the development frameworks
