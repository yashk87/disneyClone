import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Movies() {
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate()
    const [popularShow, setPopularShow] = useState([])
    const [upcomming, setUpcomming] = useState([])
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const imgUrl2 = 'https://image.tmdb.org/t/p/original';
    const apiKey = "f94776fd554e02827b68ce3712c4c690"

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(
                    'https://api.themoviedb.org/3/trending/all/day?language=en-US',
                    { params: { api_key: apiKey } }
                );
                setMovie(resp.data.results)
                console.log(resp.results);;
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(
                    'https://api.themoviedb.org/3/tv/top_rated',
                    { params: { api_key: apiKey } }
                );
                setPopularShow(resp.data.results);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(
                    'https://api.themoviedb.org/3/movie/upcoming',
                    { params: { api_key: apiKey } }
                );
                setUpcomming(resp.data.results)
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);


    const details = async (id) => {
        try {
            navigate(`/detail/${id}`);
        } catch (error) {
            console.error(error);
        }
    };


    const settings = {
        // ... other settings
        slidesToShow: 8,
        slidesToScroll: 8,
        arrows: true, // Enable arrows for manual navigation
        focusOnSelect: true,
        swipeToSlide: true,// Ensure focus on selected slide
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                },
            },
        ],
    };
    return (
        <Container>
            <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Trending🔥</div>
            <StyledSlider {...settings}>
                {movie?.map((movie, idx) => (
                    <div className='flex p-1'>
                        <Wrap className='mb-6' key={idx}>
                            <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                            <Label className='flex w-full justify-center items-center'>
                                <h5 onClick={() => details(movie.id)} style={{ lineHeight: '12px' }} className='font-bold text-xs'>
                                    {movie.name || movie.original_title}
                                </h5>
                                {/* <span onClick={() => details(movie.id)}>link</span> */}
                            </Label>
                        </Wrap>
                    </div>
                ))}
            </StyledSlider>
            <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Popular Shows</div>
            <StyledSlider {...settings}>
                {popularShow?.map((movie, idx) => (

                    <div className='flex p-1'>
                        <Wrap className='mb-6 mt-3' key={idx} onClick={() => details(movie.id)}>
                            <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                            <Label className='flex w-full justify-center items-center'>
                                <h5 style={{ lineHeight: '15px' }} className='font-bold text-xs'>
                                    {movie.name || movie.original_title}
                                </h5>
                            </Label>
                        </Wrap>
                    </div>
                ))}
            </StyledSlider>
            <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-2'>Latest Movies</div>
            <StyledSlider {...settings}>
                {upcomming?.map((movie, idx) => (
                    <div className='flex p-1'>
                        <Wrap className='mb-6 mt-3' key={idx} onClick={() => details(movie.id)}>
                            <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                            <Label className='flex w-full justify-center items-center'>
                                <h5 style={{ lineHeight: '15px' }} className='font-bold text-xs'>
                                    {movie.name || movie.original_title}
                                </h5>
                            </Label>
                        </Wrap>
                    </div>
                ))}
            </StyledSlider>
        </Container>
    );
}

export default Movies;

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
`;

const StyledSlider = styled(Slider)`
  margin-top: 20px;

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
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
`;

