import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTube from 'react-youtube';
import { Dialog, DialogActions, DialogContent, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const MovieComponent = () => {
    const apiKey = 'f94776fd554e02827b68ce3712c4c690';
    const imgUrl = 'https://image.tmdb.org/t/p/original';
    const [firstSlider, setFirstSlider] = useState([])
    const [action, setAction] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [trailer, setTrailer] = useState('');
    const [singleMovie, setSingleMovie] = useState(null);
    const [id, setId] = useState('')

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const settings2 = {
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



    // useEffect(() => {
    //     (async () => {
    //       try {
    //         let resp = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, { params: { api_key: apiKey } });

    //         // Check if 'first_air_date' is present in the TV show response
    //         console.log(resp.status);
    //         if (resp.status !== 200) {
    //           if (!resp.data.hasOwnProperty('first_air_date')) {
    //             resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
    //           }
    //         }

    //         console.log(resp.data);
    //         setSingleMovie(resp.data);
    //       } catch (error) {
    //         console.error(error);
    //         let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
    //         setSingleMovie(resp.data)
    //       }
    //     })();
    //   }, [id]);

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


    useEffect(() => {
        (async () => {
            try {
                let resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`)
                console.log(resp.data.results);
                setAction(resp.data.results)
            } catch (error) {

            }
        })()
    })

    //!action handlers


    const handleAction = async (id) => {
        setId(id)
        setOpenModal(true)
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

    }


    const handleSubmit = () => {

    }


    return (

        <>


            <Container>
                <StyledCarousel className='relative' {...settings}>
                    {firstSlider.map((data, idx) => (
                        <Wrap className='relative'>
                            <img src={`${imgUrl}/${data.backdrop_path}`} alt="Slider 1" />
                            <Wrapper className='z-30 absolute bottom-0 left-0 w-[40%] h-[30vh] p-8'>
                                <h1 className='text-4xl' >{data.original_title}</h1>
                                <div className='flex items-center gap-1'>
                                    <svg style={{ color: "#f4c418" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-5931bdee-4 eKJPfQ" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>{Math.round(data.vote_average * 10) / 10} / 10</div>
                                <div className='w-[120px] rounded-md p-2 mt-1 bg-slate-200 flex justify-center text-black'>

                                    <PlayArrowIcon />
                                    <button onClick={() => handleAction(data.id)}>Trailer</button>
                                    <div></div>
                                </div>

                            </Wrapper>
                        </Wrap>

                    ))}
                </StyledCarousel>
                <Container1>
                  
                        <Padding style={{ borderTop: "2px solid #636363", borderBottom: "2px solid #636363", borderRight: "8px solid #8a60ff", borderLeft: "8px solid #8a60ff" }} className='w-full flex justify-center p-1 bg-neutral-800 mt-4 labels'>On Air TV SHOWS</Padding>
                        <StyledSlider {...settings2}>
                            {action?.map((series, idx) => (
                                <div className='flex p-1'>
                                    <Wrap className='mb-6' key={idx}>
                                        <img alt='' src={`${imgUrl}/${series.poster_path}`} />
                                        <Label>
                                            <h5 onClick={() => handleSubmit(series.id, 'series')} style={{ lineHeight: '15px', padding: '10px' }} className='flex justify-center font-bold text-sm'>
                                                {series.name || series.original_title}
                                            </h5>
                                        </Label>
                                    </Wrap>
                                </div>
                            ))}
                        </StyledSlider>
                
                    </Container1>
            </Container>
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
                                        <YouTube videoId={trailer?.key} />
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

export default MovieComponent


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

const Container = styled.div`

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

`

const Label = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width:426px){

    h5{

        font-size:10px;
    }


    height:30px;


  }


`;
const Padding = styled.div`


@media (max-width:426px){

    height:auto;
    width:150px;
    font-size:13px;
    font-weight:bold;
    margin:0px;
    padding:0px;
    background-color: transparent;
}



`

const DIALOGCONTENT = styled.div`


`
const JUST = styled.div`

`

const YoutubeContainer = styled.div`

`

const Wrapper = styled.div`
background-color:#090b13;



`

const StyledSlider = styled(Slider)`
    margin-top: 20px;
    max-height: calc(100vh - 70px);

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
        transform: scale(1.03);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    }

    @media (max-width: 426px) {
        margin: 0;
    }
`;

const StyledCarousel = styled(Slider)`
  margin-top: 20px;

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }

  @media (max-width: 425px) {
    .slick-dots {
      display:none !important;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 25px;
      color:#878787;
    }

    .slick-next{
      position:absolute;
      right:-6px;
    }
    .slick-prev{
      position:absolute;
      left:-10px;
    }

    
  }
`;