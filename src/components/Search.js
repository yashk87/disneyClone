import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce'; // Import the debounce function

function Search() {
  const [name, setName] = useState('');
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  // const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTQ3NzZmZDU1NGUwMjgyN2I2OGNlMzcxMmM0YzY5MCIsInN1YiI6IjY1OWNlOTZmY2Y0OGExMDA5NGU2ZTYwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oQLX28XwTCu755xhMNN-LozYmPEGahZs61Tps85oRvw"; // Replace with your actual auth token
  const apiKey = "f94776fd554e02827b68ce3712c4c690";

  const debouncedSearch = debounce(async (query) => {
    try {
      const resp = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: apiKey,
          query: query,
        },
      });
      setMovie(resp.data.results);
    } catch (error) {
      console.error(error);
    }
  }, 300); // Adjust the debounce delay as needed

  const searchMovie = (query) => {
    setName(query);
    debouncedSearch(query);
  };

  const details = async (id) => {
    try {
      const resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { params: { api_key: apiKey } });
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ height: "calc(100vh - 70px)" }}>
      <div className='w-full flex justify-center gap-5'>
        <input
          value={name}
          onChange={(e) => searchMovie(e.target.value)} // Use onChange event for real-time searching
          placeholder='Enter the name of the movie'
          className='bg-[#c9c9c9] rounded-xl w-[400px] flex justify-center p-2 text-[black]'
          type='text'
        />
      </div>
      <div className='mt-5 p-5'>
        <Container>
          <Content>
            {movie.map((movie, idx) => (
              <Wrap key={idx} onClick={() => details(movie.id)}>
                <img alt='' src={`${imgUrl}/${movie.poster_path}`} />
                <Label>
                  <h5 style={{ lineHeight: "15px", padding: "10px" }} className='flex justify-center font-bold text-sm'>
                    {movie.original_title || movie.name}
                  </h5>
                </Label>
              </Wrap>
            ))}
          </Content>
        </Container>
      </div>
    </Container>
  );
}

export default Search;

const Container = styled.div`
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  margin-bottom: 15px;
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(15px);
  border-top: 0.5px solid #454545;
`;