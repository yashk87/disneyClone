import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Search from './components/Search';
import Series from './components/Series';
import Hamburger from './components/hamburger';
import MovieComponent from './components/MovieComponent';
import MovieComponent2 from './components/MovieComponent2';
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const isLoggedIn = localStorage.getItem('email') !== null;
  let path = window.location.pathname

  return (
    <MainContainer className="App">
      <Router>
        {isLoggedIn && <Header />}
        <RoutesContainer>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/series" element={<Series />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<MovieComponent2 />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </RoutesContainer>

        {path !== '/' ? 
        <HamburgerContainer>
          <Hamburger />
        </HamburgerContainer>
      : null  
      
      
      }
      </Router>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
`;


const RoutesContainer = styled.div`
  /* Add styling for the routes container as needed */
`;

const HamburgerContainer = styled.div`
  display: none; /* Hide by default */

  @media (max-width: 768px) {
    display: block; /* Show on smaller screens */
  }
`;

export default App;