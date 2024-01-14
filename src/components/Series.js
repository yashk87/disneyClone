import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Series = () => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const apiKey = "f94776fd554e02827b68ce3712c4c690"
    const navigate = useNavigate()
   
    const [series, setSeries] = useState([])
  


    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(
                    'https://api.themoviedb.org/3/tv/on_the_air',
                    { params: { api_key: apiKey } }
                );
                setSeries(resp.data.results)
                console.log(resp.results);;
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleSubmit = (id, series) =>{
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
        // ... other settings
        slidesToShow: 8,
        slidesToScroll:8 ,
        arrows: true, // Enable arrows for manual navigation
        focusOnSelect: true, // Ensure focus on selected slide
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
        <Container1>
            <Container>
            <div style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4'>On Air TV SHOWS</div>
                <StyledSlider {...settings}>
                    {series?.map((series, idx) => (
                      <div className='flex p-1'>
                        <Wrap className='mb-6' key={idx}>
                            <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                            <Label>
                                <h5 onClick={() =>handleSubmit(series.id, 'series')} style={{ lineHeight: '15px', padding: '10px' }} className='flex justify-center font-bold text-sm'>
                                    {series.name || series.original_title}
                                </h5>
                            </Label>
                        </Wrap>
                        </div>
                    ))}
                </StyledSlider>
            </Container>
        </Container1>
    )
}

export default Series;

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
`;

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
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.03);
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
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
`;
