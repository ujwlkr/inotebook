import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Notestate from './context/notes/Notestate';
function App() {
  return (
    <>
    <Notestate>
    <Router>
      <Navbar/>
      <div className="container">
      <Routes>
      <Route exact path='/'element={<Home/>}></Route>
      <Route exact path='/about'element={<About/>}></Route>
      </Routes>
      </div>
     
     </Router>
     </Notestate>
    </>
  );
}

export default App;
