import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Search from './components/Search';
import Series from './components/Series';
import Hamburger from './components/hamburger';
import MovieComponent2 from './components/MovieComponent2';
import SignIn from './components/SignIn';
import WatchList from './components/WatchList';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);

    return () => {
      localStorage.clear();
      setIsLoggedIn(false);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
      setIsLoggedIn(false);
      console.log('Logged out successfully before unload');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <MainContainer className="App">
      <Router>
        {/* Conditionally render the Header */}
        {isLoggedIn && window.location.pathname !== '/' && <Header onLogout={handleLogout} />}
        <RoutesContainer>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/series" element={<Series />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movies" element={<MovieComponent2 />} />
            <Route path="/" element={<SignIn />} />
            </Routes>
        </RoutesContainer>

        {/* Conditionally render the Hamburger */}
        {isLoggedIn && window.location.pathname !== '/' && (
          <HamburgerContainer>
            <Hamburger />
          </HamburgerContainer>
        )}
      </Router>
    </MainContainer>
  );
}

export default App;
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

