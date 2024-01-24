import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieSkeleton = () => (
  <Wrap className='mb-6'>
    <SkeletonWrapper>
    <Skeleton variant="rounded"
      className="!w-full !h-[40vh]" />
      </SkeletonWrapper>
    <Label className='flex w-full justify-center items-center'>
      <Skeleton variant="text" width={80} />
    </Label>
  </Wrap>
);



export const Series = () => {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const apiKey = "f94776fd554e02827b68ce3712c4c690"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [popular, setPopular] = useState([])
  const [fiction, setFiction] = useState([])
  const [family, setFamily] = useState([])
  const [mystery, setMystery] = useState([])

  //!generes list

  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10765`)
        console.log(resp.data.results);
        setFiction(resp.data.results)
       
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=9648`)
        setMystery(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16`)
        setPopular(resp.data.results)
      } catch (error) {

      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10751`)
        setFamily(resp.data.results)
        setLoading(false)
      } catch (error) {

      }
    })()
  }, [])

  

  const handleSubmit = (id, series) => {
    navigate(`/detail/${id}?${series}`)

  }

  // const details = async (id) => {
  //     try {
  //       const resp = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, { params: { api_key: apiKey } });
  //       navigate(`/detail/${id}`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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
          slidesToScroll:3,
          centerMode: false,
        },
      },
    ],
  };

  const handleAlert = () => {
    toast.warning("click on series label !!", {
      position: "top-right"
    });


  }
  return (
    <Container1>
      <ToastContainer theme='dark' />
      <Container>
        <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Mystery</Padding>
        <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          mystery?.map((series, idx) => (
            <div className='flex p-1'>
              <Wrap className='mb-6' key={idx} onClick={handleAlert}>
                <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                <Label>
                  <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px', padding: '10px' }} className='flex justify-center font-bold text-xs'>
                    {series.name || series.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          )))}
        </StyledSlider>
      </Container>
      <Container>
        <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Animation</Padding>
        <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          popular?.map((series, idx) => (
            <div className='flex p-1'>
              <Wrap className='mb-6' key={idx} onClick={handleAlert}>
                <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                <Label>
                  <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px', padding: '10px' }} className='flex justify-center font-bold text-xs'>
                    {series.name || series.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          )))}
        </StyledSlider>
      </Container>
      <Container>
        <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Science Fiction</Padding>
        <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          fiction?.map((series, idx) => (
            <div className='flex p-1'>
              <Wrap className='mb-6' key={idx} onClick={handleAlert}>
                <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                <Label>
                  <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px', padding: '10px' }} className='flex justify-center font-bold text-xs'>
                    {series.name || series.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          )))}
        </StyledSlider>
      </Container>
      <Container>
        <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>Family</Padding>
        <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          family?.map((series, idx) => (
            <div className='flex p-1'>
              <Wrap className='mb-6' key={idx} onClick={handleAlert}>
                <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                <Label>
                  <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '12px', padding: '10px' }} className='flex justify-center font-bold text-xs'>
                    {series.name || series.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          )))}
        </StyledSlider>
      </Container>
    </Container1>
  )
}

export default Series;


const SkeletonWrapper = styled.div`
height:auto;
@media(max-width:426px){
  height:25vh;
}

`

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
border-radius:10px;


@media (max-width:426px){

    height:auto;
    font-size:13px;
    padding:0px;
    margin-top:20px;
    font-weight:bold;
    background-color: transparent;
}



`

const StyledSlider = styled(Slider)`
  margin-top: 20px;

  .slick-list {
    overflow: initial; 
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
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }

  @media (max-width:426px){
   margin:0px; 
  }
`;

const Label = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
  width: 100%;
  height: 45px;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 0.5px solid #454545;

  @media (max-width: 426px) {
    h5 {
      font-size: 10px; // Adjust the font size as needed
    }
    height:35px;
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
      padding-top:40px;
    }
`;
