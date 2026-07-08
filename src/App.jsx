import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <BrowserRouter basename="/landingpage">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
