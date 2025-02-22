import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CategorySelection from "./CategorySelection";
import QualitativeForm from "./QualitativeForm";
import ResultDisplay from "./ResultDisplay";
import { Routes } from "react-router-dom";

export default function Header() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategorySelection />} />
        <Route path='/qualitative' element={<QualitativeForm />} />
        <Route path='/result' element={<ResultDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}
