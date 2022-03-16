import logo from './logo.svg';


import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './container/MainPage'
import { AboutPage } from './container/AboutPage'
import { ExamplePage } from 'container/ExamplePage';



function App() {
  return (
    <div> 
    <BrowserRouter basename={process.env.REACT_APP_NODE_ENV=='github_page'?'/rdrag-rdrop':''}>
      
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/example' element={<ExamplePage />}></Route>
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
