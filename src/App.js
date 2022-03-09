import logo from './logo.svg';


import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {MainPage} from './container/MainPage'
import {AboutPage} from './container/AboutPage'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
