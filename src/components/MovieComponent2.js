import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Dialog, DialogActions, DialogContent, Paper } from '@mui/material';
import YouTube from 'react-youtube';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MovieComponent2 = () => {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl2 = 'https://image.tmdb.org/t/p/original';
  const apiKey = "f94776fd554e02827b68ce3712c4c690"
  const navigate = useNavigate()

  const [action, setAction] = useState([])
  const [adventure, setAdventure] = useState([])
  const [horror, setHorror] = useState([])
  const [fiction, setFiction] = useState([])
  const [comedy, setComedy] = useState([])
  const [firstSlider, setFirstSlider] = useState([])
  const [trailerInfo, setTrailerInfo] = useState(null);
  const [id, setId] = useState('')
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`
                https://api.themoviedb.org/3/movie/now_playing`, { params: { api_key: apiKey } })
        console.log(resp.data.results);
        setFirstSlider(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`)
        console.log(resp.data.results);
        setAction(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878`)
        console.log(resp.data.results);
        setFiction(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`)
        console.log(resp.data.results);
        setHorror(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`)
        console.log(resp.data.results);
        setComedy(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=12`)
        console.log(resp.data.results);
        setAdventure(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])


  const handleSubmit = (id, series) => {
    navigate(`/detail/${id}`)

  }

  // const details = async (id) => {
  //     try {
  //       const resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, { params: { api_key: apiKey } });
  //       navigate(`/detail/${id}`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    autoplay:true,
    fade:true,
    slidesToScroll: 1,
    responsive:[

      {
        breakpoint:600,
        settings:{
          dots:false
        }
      }
    ]
  };

  const settings = {
    className: 'center',
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '1',
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
    ],
  };

  const handleAction = async (id) => {
    setId(id);
    setOpenModal(true);

    try {
      let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { params: { api_key: apiKey } });

      if (resp.data.results.length > 0) {
        const key = resp.data.results[0].key;
        setTrailerInfo({ key });
      } else {
        setTrailerInfo(null);
      }
    } catch (error) {
      console.error(error);
      setTrailerInfo(null);
    }
  };
  return (
    <>
      <StyledCarousel2 className='relative overflow-x-hidden overflow-y-hidden' {...settings2}>
        {firstSlider.map((data, idx) => (
          <Wrap1 className='relative'>
            <img src={`${imgUrl2}/${data.backdrop_path}`} alt="Slider 1" />
            <Wrapper className='z-30 absolute bottom-0 left-0 w-[40%] h-[30vh] p-8 bg-slate-900'>
              <h1 className='text-4xl' >{data.original_title}</h1>
              <Rating className='flex items-center gap-1'>
                <svg style={{ color: "#f4c418" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-5931bdee-4 eKJPfQ" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>{Math.round(data.vote_average * 10) / 10} / 10</Rating>
              <PlayBtn className='w-[120px] rounded-md p-2 mt-1 bg-slate-200 flex justify-center text-black'>

                <PlayArrowIcon />
                <button onClick={() => handleAction(data.id)}>Trailer</button>
              </PlayBtn>

            </Wrapper>
          </Wrap1>

        ))}
      </StyledCarousel2>
      <Container1>
        <Container>
          <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Action</Padding>
          <StyledSlider {...settings}>
            {action?.map((series, idx) => (
              <div className='flex p-1'>
                <Wrap className='mb-6' key={idx}>
                  <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                  <Label>
                    <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px'}} className='flex justify-center font-bold text-xs'>
                      {series.name || series.original_title}
                    </h5>
                  </Label>
                </Wrap>
              </div>
            ))}
          </StyledSlider>
        </Container>
        <Container>
          <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Horror</Padding>
          <StyledSlider {...settings}>
            {horror?.map((series, idx) => (
              <div className='flex p-1'>
                <Wrap className='mb-6' key={idx}>
                  <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                  <Label>
                    <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px'}} className='flex justify-center font-bold text-xs'>
                      {series.name || series.original_title}
                    </h5>
                  </Label>
                </Wrap>
              </div>
            ))}
          </StyledSlider>
        </Container>
        <Container>
          <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Science Fiction</Padding>
          <StyledSlider {...settings}>
            {fiction?.map((series, idx) => (
              <div className='flex p-1'>
                <Wrap className='mb-6' key={idx}>
                  <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                  <Label>
                    <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px'}} className='flex justify-center font-bold text-xs'>
                      {series.name || series.original_title}
                    </h5>
                  </Label>
                </Wrap>
              </div>
            ))}
          </StyledSlider>
        </Container>
        <Container>
          <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Comedy</Padding>
          <StyledSlider {...settings}>
            {comedy?.map((series, idx) => (
              <div className='flex p-1'>
                <Wrap className='mb-6' key={idx}>
                  <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                  <Label>
                    <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px'}} className='flex justify-center font-bold text-xs'>
                      {series.name || series.original_title}
                    </h5>
                  </Label>
                </Wrap>
              </div>
            ))}
          </StyledSlider>
        </Container>

      </Container1>

      <Dialog open={openModal} maxWidth sx={{ padding: 0, margin: 0, borderRadius: 0 }} onClose={() => setOpenModal(false)}>
        <DialogActions sx={{ padding: 0 }}>
          <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#040714', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
            <DIALOGCONTENT>
              <DialogContent >
                <JUST>
                  <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "5px solid #b185ff", borderLeft: "5px solid #b185ff" }} className='w-[250px] flex justify-center p-1 bg-neutral-700 rounded-xl'>
                    <h2 className='text-2xl mt-0'>Official Trailer</h2>
                  </div>
                </JUST>
                <div style={{ borderTop: "2px solid #636363 ", }} className='w-full h-3 mt-5'></div>
                <div style={{ borderBottom: "2px solid #636363" }} className='pb-3'>
                  <YoutubeContainer>
                    <YouTube videoId={trailerInfo?.key} />
                  </YoutubeContainer>
                </div>
              </DialogContent>
            </DIALOGCONTENT>
          </Paper>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MovieComponent2;


const Rating = styled.div`
@media(max-width:426px){
  font-size:11px;
}

`


const PlayBtn = styled.div`
@media(max-width:426px){
  width:100px;
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:5px;

  button{
    font-size:15px;
  }
}

`


const DIALOGCONTENT = styled.div`

@media (max-width:426px){
  h2{
    font-size:15px;
  }

}

`

const JUST = styled.div`
@media(max-width:426px){
  padding:0px;
  margin:0px;
}
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

const Wrap1 = styled.div`

img{
  height:80vh;
  width:100%;
  object-fit:cover;
}

@media(max-width :426px){
  img{
    width:100%;
    height:50vh;
  }
}

`



const StyledCarousel2 = styled(Slider)`

@media (max-width:426px){
  height:50vh;
}
  .slick-list {

  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 24px;
    color: white;
  }

  .slick-slide {
    transition: opacity 0.5s ease-in-out;
  }

`;

const Container = styled.div`
  .slick-prev,
  .slick-next {
    font-size: 0; 
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 24px; 
    color: white;
  }

  @media (max-width:426px){
    
  }
`;

const Padding = styled.div`


@media (max-width:426px){

    height:auto;
    width:100%;
    font-size:13px;
    padding:0px;
    font-weight:bold;
    background-color: transparent;
}



`


const Wrapper = styled.div`


@media (max-width:426px){
  text-align:center;
  width:100%;
  height:15vh;
  background-color:rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  h1{
    font-size:20px;
    font-weight:bold;
    line-height:20px;

  }

}



`

const StyledSlider = styled(Slider)`
  margin-top: 20px;

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:after {
    font-size: 24px; 
    content:'',
   
    color: white;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 1)); // Add dark shadow to buttons
    
  }

  @media (max-width:426px){
    .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    color:#8960fe;
  }


  .slick-next:before{
    position:relative;
    right:20px;
    bottom:6px;
  }
  .slick-prev:before{
    position:relative;
    left:12px;
    bottom:6px;
  }

  }
`;


const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 100%;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }

  @media (max-width: 426px) {
    margin:0px;
  }
`;

const Label = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  display:flex;
  align-items:center;
  justify-content:center;

  @media (max-width: 426px) {
  
    h5 {
      
      font-size: 10px; 
    }
    height:30px;
  }

`;

const Container1 = styled.main`
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


    @media (max-width:426px){
     
    }
`;
