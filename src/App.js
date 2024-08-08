import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Section1 from './component/side_nav';
import Section2 from './component/episodelist';
import './App.css';
import './component/style.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Section1 />} />
          <Route path="/list/:id" element={<Section2 />} />
          <Route path="/list" element={<Section2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
