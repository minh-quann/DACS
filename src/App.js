import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import DisplayResult from "./DisplayResult.js";
import Result from './Result.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/result" element={<Result/>} />
      </Routes>
    </Router>
  );
}

export default App;
