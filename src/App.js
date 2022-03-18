import logo from './logo.svg';


import './App.css';
import {BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'
import { MainPage } from './container/MainPage'
import { AboutPage } from './container/AboutPage'
import { ExamplePage } from 'container/ExamplePage';
import GitHubPageRoute from 'hoc/router/GithubRoute'

let NODE_ENV = process.env.REACT_APP_NODE_ENV
NODE_ENV = 'github_page'
const baseName = NODE_ENV=='github_page'?'/rdrag-rdrop':''
function App() {
  console.log('ssfff', NODE_ENV, baseName)
  
  return (
    
    <BrowserRouter >
      
      <Routes basename={baseName}>
        <Route path={baseName+'/'} element={GitHubPageRoute(MainPage, baseName)}></Route>
        <Route path={baseName+'/about'} element={GitHubPageRoute(AboutPage, baseName)}></Route>
        <Route path={baseName+'/example'} element={GitHubPageRoute(ExamplePage, baseName)}></Route>
      </Routes>
    </BrowserRouter>  
    
  );
}

export default App;
