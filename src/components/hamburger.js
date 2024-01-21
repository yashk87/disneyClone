import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from './config';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dialog, DialogActions, DialogContent, Paper } from '@mui/material';

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        setPhoto(user.photoURL);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleSettings = () => {
    localStorage.clear();
    setOpenModal(false);
    navigate('/');
    window.location.reload();
  };

  const handleLinkClick = () => {
    document.body.style.overflow = 'auto'; 
    setIsOpen(false); 
  };

  return (
    <div>
      <div className='w-full bg-[#212121] p-2 fixed z-50 top-0 flex'>
        <button className="open-button absolute top-3" onClick={handleOpen}>
          <MenuIcon /> {/* Use MenuIcon for opening */}
        </button>
        <div className='w-full flex justify-center items-center'>
          <img className='w-16 ' src="/images/logo.svg" />
        </div>
        <UserImg onClick={() => setOpenModal(true)} src={photo} />
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogActions sx={{ padding: 0 }}>
          <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#212121', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
            <DialogContent>
              <div>
                <h1 className='mb-3 text-gray-400'>Logged In as :</h1>
                <h1 className='mb-5'>{email}</h1>
                <Button fullWidth variant='contained' color='secondary' onClick={handleSettings}> Log Out</Button>
              </div>
            </DialogContent>
          </Paper>
        </DialogActions>
      </Dialog>

      <HamburgerContainer
        className={`w-full bg-[#212121] p-2 fixed h-full z-50 top-0 flex flex-col gap-5 ${isOpen ? 'open' : 'closed'
          }`}
      >
        <div className="w-8 h-8 bg-slate-400 ml-[10px] mt-3">
          <div className="flex justify-center items-center relative top-1">
            <CloseIcon onClick={handleClose} />
          </div>
        </div>
        <Link to="/home" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/home-icon.svg" />
          <span>HOME</span>
        </Link>
        <Link to="/search" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/search-icon.svg" />
          <span>SEARCH</span>
        </Link>
        <Link to="/watchlist" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/watchlist-icon.svg" />
          <span>WATCHLIST</span>
        </Link>
        <Link to="/originals" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/original-icon.svg" />
          <span>ORIGINALS</span>
        </Link>
        <Link to="/movies" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/movie-icon.svg" />
          <span>MOVIES</span>
        </Link>
        <Link to="/series" className='flex gap-2 text-lg items-center ml-2' onClick={handleLinkClick}>
          <img className='w-7' alt='' src="/images/series-icon.svg" />
          <span>SERIES</span>
        </Link>
      </HamburgerContainer>
    </div>
  )
}

export default Hamburger

const HamburgerContainer = styled.div`
  transition: transform 0.3s ease-in-out; /* Add transition for sliding */
  max-height: 100vh; /* Set the maximum height to 100vh */
  overflow-y: auto; /* Add overflow-y auto to enable scrolling if the content exceeds 100vh */

  @media (max-width: 425px) {
    padding: 0px;
    left: 0px;
  }

  &.closed {
    transform: translateX(-100%); /* Hide the container when closed */
  }

  &.open {
    transform: translateX(0); /* Show the container when open */
  }
`;

const UserImg = styled.img`
  position: fixed;
  right: 6px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;