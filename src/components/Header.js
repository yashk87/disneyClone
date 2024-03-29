import { Button, Dialog, DialogActions, DialogContent, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from './config'
import { onAuthStateChanged } from 'firebase/auth';
import "./responsive.css"
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { app, firestore } from './config'
import 'firebase/firestore';


function Header() {
    const [openModal, setOpenModal] = useState(false)
    const [photo, setPhoto] = useState()
    const [email, setEmail] = useState('')
    const [data, setData] = useState([])
    const [present, setPresent] = useState(false)
    const navigate = useNavigate()

    

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setEmail(user.email);
            setPhoto(user.photoURL);
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [email]);

    const handleSettings = () => {
        localStorage.clear()
        setOpenModal(false)
        console.log(openModal);
        navigate('/')
        window.location.reload()

    }

    console.log(data);

    return (
        <Nav className='header'>
            <Link to="/">
                <Logo src="/images/logo.svg" />
            </Link>
            <NavMenu className='headerMenu'>
                <Link to="/home">
                    <img alt='' src="/images/home-icon.svg" />
                    <span>HOME</span>

                </Link>
                <Link to="/search">
                    <img alt='' src="/images/search-icon.svg" />
                    <span>SEARCH</span>
                </Link>
                <Link to="/watchlist">

                    <img alt='' src="/images/watchlist-icon.svg" />
                    <span>WATCHLIST</span>
                </Link>
                <Link to="/movies">
                    <img alt='' src="/images/movie-icon.svg" />
                    <span>MOVIES</span>
                </Link>
                <Link to="/series">
                    <img alt='' src="/images/series-icon.svg" />
                    <span>SERIES</span>
                </Link>
            </NavMenu>


            {/* <Link to="/fdafd" > */}

            {/* <AccountBoxIcon className='cursor-pointer' onClick={() => setOpenModal(true)} /> */}
            <UserImg onClick={() => setOpenModal(true)} src={photo} />
            {/* </Link> */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogActions sx={{ padding: 0 }}>
                    <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#212121', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
                        <DialogContent>
                            <div>
                                <h1 className='mb-3 text-gray-400'>Logged In as :</h1>
                                <h1 className='mb-5'>{email}</h1>

                                <Button fullWidth variant='contained' color='secondary' onClick={handleSettings}>Log Out</Button>

                            </div>

                        </DialogContent>
                    </Paper>
                </DialogActions>
            </Dialog>
        </Nav>
    );
}

export default Header;

const Nav = styled.nav`

height:70px;
background:#090b13;
display:flex;
align-items:center;
padding:0 36px;
overflow:hidden;

@media (max-width : 426px){
 width:100%;
 padding:0px;
 font-size:10px;
 display:none;

  }


`

const Logo = styled.img`
width:80px;


`

const NavMenu = styled.div`
display:flex;
flex:1;
margin-left:25px;
align-items:center;

a{
    display:flex;
    align-items:center;
    padding:0 12px;
    cursor:pointer;

    img{
        height:20px;

    }

    span{
        font-size:13px;
        letter-spacing:1.42px;
        position:relative;

        &:after{
            content:"";
            position:absolute;
            right:0;
            bottom:-6px;
            left:0;
            height:2px;
            background:white;
            transform-origin:left center;
            transition:all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            opacity:0;
            transform:scaleX(0);
        }
    }

    &:hover{
        span:after{
            transform:scaleX(1);
            opacity:1;
        }
    }

    @media (max-width : 426px){
        
       
         }

}

`

const UserImg = styled.img`

width:40px;
border-radius:50%;
cursor:pointer;

`

