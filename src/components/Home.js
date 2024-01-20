import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import Viewers from './Viewers';
import Movies from './Movies';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


function Home() {
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('email') !== null;
        const hasRefreshed = localStorage.getItem('hasRefreshed');

        if (isLoggedIn && !hasRefreshed) {
            localStorage.setItem('hasRefreshed', 'true');
            window.location.reload();
        }
    }, []);
    return (
        <Container className='relative'>
            <ImageSlider />
            <Viewers />
            <Movies />
            

        </Container>
    );
}

export default Home;

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;


    &:before {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    @media (max-width:425px){
        padding-top:48px;
    }

`;



