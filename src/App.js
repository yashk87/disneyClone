import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Series from './components/Series';
import SignIn from './components/SignIn';

function App() {
  const isLoggedIn = localStorage.getItem('email') !== null;

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Header />}
       
        <Routes>  
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/series" element={<Series />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;