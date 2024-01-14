import React, { useState } from 'react';
import styled from 'styled-components';

function Viewers() {
    const [isDisneyHovered, setIsDisneyHovered] = useState(false);
    const [isPixarHovered, setIsPixarHovered] = useState(false);
    const [isMarvelHovered, setIsMarvelHovered] = useState(false);
    const [isStarWarsHovered, setIsStarWarsHovered] = useState(false);
    const [isNationalHovered, setIsNationalHovered] = useState(false);

    const handleMouseEnter = (logo) => {
        switch (logo) {
            case 'disney':
                setIsDisneyHovered(true);
                break;
            case 'pixar':
                setIsPixarHovered(true);
                break;
            case 'marvel':
                setIsMarvelHovered(true);
                break;
            case 'starwars':
                setIsStarWarsHovered(true);
                break;
            case 'national':
                setIsNationalHovered(true);
                break;
            default:
                break;
        }
    };

    const handleMouseLeave = (logo) => {
        switch (logo) {
            case 'disney':
                setIsDisneyHovered(false);
                break;
            case 'pixar':
                setIsPixarHovered(false);
                break;
            case 'marvel':
                setIsMarvelHovered(false);
                break;
            case 'starwars':
                setIsStarWarsHovered(false);
                break;
            case 'national':
                setIsNationalHovered(false);
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <Container>

                <Wrap
                    onMouseEnter={() => handleMouseEnter('disney')}
                    onMouseLeave={() => handleMouseLeave('disney')}
                >
                    {isDisneyHovered ? (
                        <Video autoPlay muted loop>
                            <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
                        </Video>
                    ) : (
                        <img alt='some.png' src='/images/viewers-disney.png' />
                    )}
                </Wrap>

                <Wrap
                    onMouseEnter={() => handleMouseEnter('pixar')}
                    onMouseLeave={() => handleMouseLeave('pixar')}
                >
                    {isPixarHovered ? (
                        <Video autoPlay muted loop>
                            <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
                        </Video>
                    ) : (
                        <img alt='some.png' src='/images/viewers-pixar.png' />
                    )}
                </Wrap>

                <Wrap
                    onMouseEnter={() => handleMouseEnter('marvel')}
                    onMouseLeave={() => handleMouseLeave('marvel')}
                >
                    {isMarvelHovered ? (
                        <Video autoPlay muted loop>
                            <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
                        </Video>
                    ) : (
                    <img alt='some.png' src='/images/viewers-marvel.png' />
                    )}
                </Wrap>

                <Wrap
                    onMouseEnter={() => handleMouseEnter('starwars')}
                    onMouseLeave={() => handleMouseLeave('starwars')}
                >
                    {isStarWarsHovered ? (
                        <Video autoPlay muted loop>
                            <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
                        </Video>
                    ) : (
                    <img alt='some.png' src='/images/viewers-starwars.png' />
                    )}
                </Wrap>
                <Wrap
                    onMouseEnter={() => handleMouseEnter('national')}
                    onMouseLeave={() => handleMouseLeave('national')}
                >
                    {isNationalHovered ? (
                        <Video autoPlay muted loop>
                            <source src="/videos/1564676296-national-geographic.mp4" type="video/mp4" />
                        </Video>
                    ) : (
                    <img alt='some.png' src='/images/viewers-national.png' />
                    )}
                </Wrap>

            </Container>


        </div>
    )
}

export default Viewers;

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-gap: 25px;
  padding: 30px 0px 26px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const Wrap = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  border-radius: 10px;
`;