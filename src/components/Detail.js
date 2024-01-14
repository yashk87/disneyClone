import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Paper } from '@mui/material';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';

function Detail() {
  const [singleMovie, setSingleMovie] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [trailer, setTrailer] = useState('');
  const { id } = useParams();
  const apiKey = 'f94776fd554e02827b68ce3712c4c690';
  const imgUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, { params: { api_key: apiKey } });

        // Check if 'first_air_date' is present in the TV show response
        console.log(resp.status);
        if (resp.status !== 200) {
          if (!resp.data.hasOwnProperty('first_air_date')) {
            resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
          }
        }

        console.log(resp.data);
        setSingleMovie(resp.data);
      } catch (error) {
        console.error(error);
        let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
        setSingleMovie(resp.data)
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



  return (
    <Container>
      {singleMovie && <Background>
        <img src={`${imgUrl}${singleMovie.backdrop_path}`} alt='' />
      </Background>}
      <ImageTitle>
        <img onError={(e) => {
          e.target.src = 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D7AEE1F05D10FC37C873176AAA26F777FC1B71E7A6563F36C6B1B497CAB1CEC2/scale?width=1440&aspectRatio=1.78'; // Replace 'path_to_alternative_image.jpg' with the actual path to your alternative image
        }} className='pb-5' src={`${imgUrl}${singleMovie?.production_companies[0]?.logo_path}`} />
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src='/images/play-icon-black.png' />
          <span className='text-slate-900'>PLAY</span>
        </PlayButton>

        <TrailerButton onClick={() => setOpenModel(true)}>
          <img src='/images/play-icon-white.png' />
          <span>Trailer</span>

        </TrailerButton>
        <AddButton>
          <span>+</span>

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

      <Dialog open={openModel} maxWidth sx={{ padding: 0, margin: 0, borderRadius: 0 }} onClose={() => setOpenModel(false)}>
        <DialogActions sx={{ padding: 0 }}>
          <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#040714', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
            <DialogContent >
              <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "5px solid #b185ff", borderLeft: "5px solid #b185ff" }} className='w-[250px] flex justify-center p-1 bg-neutral-700 rounded-xl'>
                <h2 className='text-2xl mt-0'>Official Trailer</h2>
              </div>
              <div style={{ borderTop: "2px solid #636363 ", }} className='w-full h-3 mt-5'></div>
              <div style={{ borderBottom: "2px solid #636363" }} className='pb-3'>
                <YouTube videoId={trailer?.key} />
              </div>
            </DialogContent>
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

const Background = styled.div`
position:fixed;
top:50px;
left:0;
bottom:0;
right:0;
z-index:-1;
opacity:0.8;

img{
    width:100%;
    height:calc(100vh-70px);
    object-fit:cover;
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

`

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
`

const Controls = styled.div`
display:flex;
align-items:center;

`

const PlayButton = styled.button`
border-radius:4px;
font-size:15px;
display:flex;
padding:0 24px;
margin-right:22px;
height:56px;
background:rgb(249, 249, 249);
align-items:center;
border:none;
letter-spacing:1.8px;
cursor:pointer;

&:hover{
    background:rgb(198, 198, 198);
    color:black;
}

`

const TrailerButton = styled(PlayButton)`
background:rgba(0,0,0,0.3);
border:1px solid rgb(249,249,249);
color:rgb(249,249,249);
text-transform:uppercase;


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

`

const GroupWatchButton = styled(AddButton)`
background:rgb(0,0,0);

`

const SubTitle = styled.div`
color:rgb(249,249,249);
font-size:15px;
min-height:20px;
margin-top:26px;
`
const Description = styled.div`
line-height:1.4;
font-size:20px;
margin-top:16px;
color:rgb(249,249,249);
max-width:760px;
`