import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/HomePage";
import Result from './pages/ResultPage';

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
