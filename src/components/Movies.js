import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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



const Movies = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const [popularShow, setPopularShow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const apiKey = 'f94776fd554e02827b68ce3712c4c690';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const resp = await axios.get(url, { params: { api_key: apiKey } });
        setState(resp.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataWithDelay = async (url, setState) => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 3 seconds
      await fetchData(url, setState);
      setLoading(false);
    };

    fetchDataWithDelay('https://api.themoviedb.org/3/trending/all/day?language=en-US', setMovie);
    fetchData('https://api.themoviedb.org/3/tv/top_rated', setPopularShow);
    fetchData('https://api.themoviedb.org/3/movie/upcoming', setUpcoming);
  }, []);

  const details = async (id) => {
    try {
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <Container>
      <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Trending</Padding>
      <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          movie.map((movie, idx) => (
            <div className='flex p-1' key={idx}>
              <Wrap className='mb-6'>
                <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                <Label className='flex w-full justify-center items-center'>
                  <h5 onClick={() => details(movie.id)} style={{ lineHeight: '12px' }} className='font-bold text-xs'>
                    {movie.name || movie.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          ))
        )}
      </StyledSlider>
      <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Popular Shows</Padding>
      <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          popularShow.map((movie, idx) => (
            <div className='flex p-1' key={idx}>
              <Wrap className='mb-6 mt-3'>
                <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                <Label className='flex w-full justify-center items-center'>
                  <h5 style={{ lineHeight: '12px' }} className='font-bold text-xs' onClick={() => details(movie.id)}>
                    {movie.name || movie.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          ))
        )}
      </StyledSlider>
      <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Latest Movies</Padding>
      <StyledSlider {...settings}>
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => <MovieSkeleton key={idx} />)
        ) : (
          upcoming.map((movie, idx) => (
            <div className='flex p-1' key={idx}>
              <Wrap className='mb-6 mt-3'>
                <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                <Label className='flex w-full justify-center items-center'>
                  <h5 style={{ lineHeight: '12px' }} className='font-bold text-xs' onClick={() => details(movie.id)}>
                    {movie.name || movie.original_title}
                  </h5>
                </Label>
              </Wrap>
            </div>
          ))
        )}
      </StyledSlider>
    </Container>
  );
}

export default Movies;


const SkeletonWrapper = styled.div`
height:auto;
@media(max-width:426px){
  height:25vh;
}

`

const Container = styled.div`
  .slick-prev,
  .slick-next {
    font-size: 0; // Set font size to 0 to hide text
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px; // Reset font size for arrow icons
    color: white;
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
    bottom:18px;
  }
  .slick-prev:before{
    position:relative;
    left:12px;
    bottom:18px;
  }
`;

const StyledSlider = styled(Slider)`
  margin-top: 20px;

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }

  .slick-track {
    transition: transform all 0.5s cubic-bezier(0.52, 0.01, 0.2, 1);
  }

  .slick-slide {
    transition: transform all 0.5s cubic-bezier(0.52, 0.01, 0.2, 1);
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
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }

  @media (max-width: 426px) {
    margin-top: 0px;
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

  @media (max-width: 426px) {
    h5 {
      font-size: 10px;
    }

    height: 30px;
  }
`;

const Padding = styled.div`
  @media (max-width: 426px) {
    height: auto;
    font-size: 13px;
    font-weight: bold;
    margin: 0px;
    padding: 0px;
    background-color: transparent;
  }
  `
