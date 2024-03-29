import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogContent, DialogActions, Paper } from '@mui/material';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import Lottie from 'lottie-react'
import animationData from "../components/Animation - 1707196824512.json"
import { getFirestore, collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { app, auth, firestore } from './config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./responsive.css"
function Detail() {
  const thumbRef = useRef()
  const [singleMovie, setSingleMovie] = useState(null);
  const [added, setAdded] = useState(false)
  const [openModel, setOpenModel] = useState(false);
  const [trailer, setTrailer] = useState('');
  const { id } = useParams();
  const [authState, setAuthState] = useState(null)
  const apiKey = 'f94776fd554e02827b68ce3712c4c690';
  const imgUrl = 'https://image.tmdb.org/t/p/original';
  const auth = getAuth()



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (authState) {
      (async () => {
        const userDocRef = doc(firestore, 'users', authState.uid);
        const wishlistCollectionRef = collection(userDocRef, 'wishlist');
        const querySnapshot = await getDocs(wishlistCollectionRef);
        const existingMovies = querySnapshot.docs.map((doc) => doc.data());
        const isMovieAlreadyAdded = existingMovies.some((movie) => {
          return (
            movie.title === (singleMovie?.name || singleMovie?.original_title) &&
            movie.poster_path === singleMovie?.poster_path &&
            movie.overview === singleMovie?.overview &&
            movie.id === singleMovie?.id
          );
        });
        if (isMovieAlreadyAdded) {
          setAdded(true);
        }
      })();
    }
  }, [authState, singleMovie]);




  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, { params: { api_key: apiKey } });

        if (resp.status !== 200) {
          if (!resp.data.hasOwnProperty('first_air_date')) {
            resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
          }
        }

        setSingleMovie(resp.data);
      } catch (error) {
        console.error(error);
        let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
        setSingleMovie(resp.data);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        let trailerResp;
        if (singleMovie && singleMovie.hasOwnProperty('first_air_date')) {
          trailerResp = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, { params: { api_key: apiKey } });
        } else {
          trailerResp = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { params: { api_key: apiKey } });
        }

        setTrailer(trailerResp.data.results[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, singleMovie]);

  const handleWatchlist = async () => {
    if (!auth.currentUser || !singleMovie) {
      return;
    }

    const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
    const wishlistCollectionRef = collection(userDocRef, 'wishlist');

    try {
      const querySnapshot = await getDocs(wishlistCollectionRef);

      const existingMovies = querySnapshot.docs.map((doc) => doc.data());
      const isMovieAlreadyAdded = existingMovies.some((movie) => {
        return (
          movie.title === (singleMovie?.name || singleMovie?.original_title) &&
          movie.poster_path === singleMovie?.poster_path &&
          movie.overview === singleMovie?.overview &&
          movie.id === singleMovie?.id
        );
      });

      if (isMovieAlreadyAdded) {
        console.log('Movie already exists in wishlist');
        toast.error("movie already present in watchlist", {
          position: "top-right"
        });
        return;
      }
      const result = await addDoc(wishlistCollectionRef, {
        poster_path: singleMovie?.poster_path,
        title: singleMovie?.name || singleMovie?.original_title,
        overview: singleMovie?.overview,
        id: singleMovie?.id
      });

      console.log('Movie added to wishlist:', result);
      setAdded(true)
      toast.success("Added to watchlist", {
        position: "top-right"
      });
    } catch (error) {
      console.error('Error adding movie to wishlist:', error);
    }
  };

  return (
    <Container>
      <ToastContainer theme='dark' />
      {singleMovie && <Background>
        <img src={`${imgUrl}${singleMovie.backdrop_path}`} alt='' />
      </Background>}

      <DiffDIV>
        <ImageTitle>
          <img onError={(e) => {
            e.target.src = 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D7AEE1F05D10FC37C873176AAA26F777FC1B71E7A6563F36C6B1B497CAB1CEC2/scale?width=1440&aspectRatio=1.78'; // Replace 'path_to_alternative_image.jpg' with the actual path to your alternative image
          }} className='pb-5' src={`${imgUrl}${singleMovie?.production_companies[0]?.logo_path}`} />
        </ImageTitle>
        <Controls>
          <PlayButton>
            <PlayArrowIcon />
            <span>PLAY</span>
          </PlayButton>

          <TrailerButton onClick={() => setOpenModel(true)}>
            <PlayArrowIcon />
            <span>Trailer</span>

          </TrailerButton>
          <AddButton className='flex justify-center items-center' onClick={handleWatchlist}>
            <span>{added ? <Lottie loop={false} onComplete={() => thumbRef.current.pause()} lottieRef={thumbRef} animationData={animationData} style={{ width: '60px', height: '60px' }} /> : "+"}</span>

          </AddButton>
          <GroupWatchButton>

            <img src='/images/group-icon.png' />
          </GroupWatchButton>

        </Controls>
        <SubTitle>
          <h1 className='text-4xl font-semibold mb-3'>{singleMovie?.name || singleMovie?.original_title}</h1>
          {`${singleMovie?.release_date} * 7m * Family, ${singleMovie?.genres[0].name}, Adult`}
        </SubTitle>
        <Description>
          {singleMovie?.overview}
        </Description>
      </DiffDIV>

      <Dialog open={openModel} maxWidth sx={{ padding: 0, margin: 0, borderRadius: 0 }} onClose={() => setOpenModel(false)}>
        <DialogActions sx={{ padding: 0 }}>
          <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#040714', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
            <DIALOGCONTENT>
              <DialogContent  >
                <JUST>
                  <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "5px solid #b185ff", borderLeft: "5px solid #b185ff" }} className='w-[250px] flex justify-center p-1 bg-neutral-700 rounded-xl'>
                    <h2 className='text-2xl mt-0'>Official Trailer</h2>
                  </div>
                </JUST>
                <div style={{ borderTop: "2px solid #636363 ", }} className='w-full h-3 mt-5'></div>
                <div style={{ borderBottom: "2px solid #636363" }} className='pb-3'>
                  <YoutubeContainer>
                    <YouTube videoId={trailer?.key} />
                  </YoutubeContainer>
                </div>
              </DialogContent>
            </DIALOGCONTENT>
          </Paper>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Detail

const Container = styled.div`
min-height:calc(100vh-70px);
padding:0 calc(3.5vw + 5px);
position:relative;

`
const YoutubeContainer = styled.div`
  width: 100%;
@media (max-width:426px){

  iframe {
    width: 100%;
    height: 100%;
  }

}
`;

const JUST = styled.div`
@media(max-width:426px){
  padding:0px;
  margin:0px;
}
`

const DIALOGCONTENT = styled.div`

@media (max-width:426px){
  h2{
    font-size:15px;
  }

}

`

const Background = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;  // Default height
    object-fit: cover;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 426px) {
    img {
      height: 50vh;  // Updated height to 60vh when the screen width is 426px or less
    }

    &:after {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`;

const ImageTitle = styled.div`
height:30vh;
width:35vw;
min-height:170px;
min-width:200px;
margin-top:60px;
img{
    width:60%;
    height:100%;
    object-fit:contain;
}
@media (max-width:426px){
  margin-top:0px;
  min-height:0px;
  height:0px;


  img{
    position:absolute;
    display:flex;
    align-items:center;
    top:-260px;
    width:100px;

  }
}

`

const Controls = styled.div`
display:flex;
align-items:center;

@media (max-width:426px){
  width:100%;
  padding-top:40px;
}

`

const PlayButton = styled.button`
border-radius:4px;
font-size:15px;
display:flex;
padding:0 24px;
border:1px solid rgb(249,249,249);
margin-right:22px;
height:56px;
background:rgba(0,0,0,0.3);
align-items:center;
letter-spacing:1.8px;
cursor:pointer;
transition:0.3s all ease-in-out;

&:hover{
    background:rgba(256,256,256,0.8);
    color:black;

    span{
      color:black;
    }
}

@media (max-width:426px){
  font-size:12px;
  width:80px;

  img{
    width:25px;
  }

  padding:5px;
  height:40px;

}

`

const DiffDIV = styled.div`
@media (max-width:426px){
  padding:20px;
  background-color:rgba(9, 11, 19, 0.2);
  margin:0px;
  width:100%;
  left:0;
  position:absolute;
  height:auto;
  top:26.5rem;
  backdrop-filter: blur(2px);
  min-height:0px;
}

`

const TrailerButton = styled(PlayButton)`
border:1px solid rgb(249,249,249);
color:rgb(249,249,249);
text-transform:uppercase;



@media (max-width:426px){
  width:110px;
}


`

const AddButton = styled.button`
margin-right:16px;
width:44px;
height:44px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
border:2px solid white;
background-color:rgba(0, 0, 0 , 0.6);
cursor:pointer;
span{
    font-size:30px;
}

@media(max-width:426px){
  width:30px;
  height:30px;
  margin-right:10px;
}

`

const GroupWatchButton = styled(AddButton)`
background:rgb(0,0,0);

@media(max-width:426px){
  width:30px;
  height:30px;
}

`

const SubTitle = styled.div`
color:rgb(249,249,249);
font-size:15px;
min-height:20px;
margin-top:26px;

h1{
  color:rgb(249,249,249);
}



@media (max-width:426px){
  h1{
    font-size:2rem;
  }

  font-size:12px;
  margin-top:10px;
  margin-bottom:10px;
}
`
const Description = styled.div`
line-height:1.4;
font-size:20px;
margin-top:16px;
color:rgb(249,249,249);
max-width:760px;

@media (max-width:426px){
  font-size:0.92rem;
  margin-top:10px;
}

`