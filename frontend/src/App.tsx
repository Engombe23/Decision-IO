import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultDisplay from "./components/ResultDisplay";
import CategorySelection from "./components/CategorySelection";
import QualitativeForm from "./components/QualitativeForm";
import QuantitativeForm from "./components/QuantitativeForm";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<CategorySelection />} />
        <Route path='/quantitative' element={<QuantitativeForm />} />
        <Route path='/qualitative' element={<QualitativeForm />} />
        <Route path='/result' element={<ResultDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
