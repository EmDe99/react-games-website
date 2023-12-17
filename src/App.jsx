import "./App.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Memory from './components/Memory/Memory.jsx';
import Geo from './components/Geo/Geo.jsx';
import Math from './components/Math/Math.jsx';
import Random from './components/Guesser/Guesser.jsx';
import StartMenu from './components/StartMenu/StartMenu.jsx';



function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <Router basename="/react-games"> {"/react-games"}
          <Nav />
          <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="/Memory" element={<Memory />} />
            <Route path="/Geo" element={<Geo />} />
            <Route path="/Math" element={<Math />} />
            <Route path="/Guesser" element={<Random />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
