import React, { useState, useEffect } from 'react';
import { doc, collection, getDocs, deleteDoc, where, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './config';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from 'styled-components';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const WatchList = () => {
  const [data, setData] = useState([]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const imgUrl = 'https://image.tmdb.org/t/p/original';
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const wishlistCollectionRef = collection(userDocRef, 'wishlist');

        try {
          const querySnapshot = await getDocs(wishlistCollectionRef);
          const wishlistData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setData(wishlistData);
        } catch (error) {
          console.error('Error fetching wishlist data:', error);
        }
      } else {
        console.log('User not authenticated');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        // User is not authenticated, handle accordingly
        console.log('User not authenticated');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveClick = (movieId) => {
    setSelectedMovieId(movieId);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = () => {
    setRemoveDialogOpen(false);
    setSelectedMovieId(null);
  };

  const handleConfirmRemove = async () => {
    try {
      const user = auth.currentUser;

      if (user && selectedMovieId) {
        const wishlistCollectionRef = collection(doc(firestore, 'users', user.uid), 'wishlist');

        const querySnapshot = await getDocs(query(wishlistCollectionRef, where('id', '==', selectedMovieId)));

        const docRef = querySnapshot.docs[0]?.ref;

        if (docRef) {
          await deleteDoc(docRef);
          toast.success("Movie removed successfully !", {
            position: "top-right"
          });
          setData((prevData) => prevData.filter((movie) => movie.id !== selectedMovieId));
        } else {
          console.error('Document not found');
        }
      }
    } catch (error) {
      console.error('Error removing movie from wishlist:', error);
    } finally {
      setRemoveDialogOpen(false);
      setSelectedMovieId(null);
    };
  }




  const handleSubmit = (id) => {

    navigate(`/detail/${id}`)

  }

  return (
    <div className='w-full'>
      <ToastContainer theme='dark' />
      <Padding
        style={{
          borderTop: '2px solid #636363',
          borderBottom: '2px solid #636363',
          borderRight: '8px solid #8a60ff',
          borderLeft: '8px solid #8a60ff',
        }}
        className='w-[95vw] m-auto flex justify-center p-1 bg-neutral-800 mt-4'
      >
        Watchlisted Movies
      </Padding>
      <Container>
        {
          data.length === 0 ? <h1 className='w-full text-center mt-2'>your watchlist is empty !</h1>
            :

            (data?.map((movie) => (
              <div className='flex p-5 justify-center' key={movie?.id}>
                <Wrap className='mb-6'>
                  <img alt='' src={`${imgUrl}/${movie?.poster_path}`} />
                  <Label >
                    <h5
                      onClick={() => handleSubmit(movie?.id)}
                      style={{ lineHeight: '12px', padding: '10px' }}
                      className='flex justify-center font-bold text-xs'
                    >
                      {movie.title}
                    </h5>
                    <div className='w-auto absolute right-1 rounded-full flex justify-center items-center' style={{ backgroundColor: "white" }} >
                      <RemoveCircleIcon sx={{ color: "black", }} onClick={() => handleRemoveClick(movie?.id)} />
                    </div>
                  </Label>
                </Wrap>
              </div>
            ))



            )}
      </Container>

      <Dialog open={removeDialogOpen} onClose={handleRemoveDialogClose}>
        <Paper sx={{ padding: 0 }} style={{ backgroundColor: '#040509', color: 'white', borderRadius: 0, boxShadow: 'none', padding: 0, margin: 0 }}>
          <DialogTitle>Remove Movie</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to remove this movie from your watchlist?</p>
          </DialogContent>
          <DialogActions>
            <Button size='small' className='!rounded-lg' onClick={handleRemoveDialogClose} sx={{ boxShadow: "none" }} variant='contained' color='error'>
              Cancel
            </Button>
            <Button size='small' className='!rounded-lg' onClick={handleConfirmRemove} sx={{ boxShadow: "none" }} variant='contained' color='secondary'>
              Remove
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

export default WatchList;



const Container = styled.div`
display: grid;
grid-template-columns: repeat(6, minmax(0, 1fr));
  overflow: hidden;
  .slick-prev,
  .slick-next {
    font-size: 0;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 24px;
    color: white;
  }

  @media (max-width: 426px) {
    grid-template-columns:repeat(2, minmax(0,1fr));
  }
`;

const Padding = styled.div`
  @media (max-width: 426px) {
    height: auto;
    font-size: 13px;
    padding: 0px;
    margin-top: 60px;
    font-weight: bold;
    background-color: transparent;
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 69%) 0px 1px 3px 0px, rgb(0 0 0 / 73%) 0px 1px 2px 0px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  position: relative;
  height: 300px;
  padding-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 426px) {
    height: 200px;
  }
`;

const Label = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 40;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 0.5px solid #454545;

  h5 {
    font-size: 12px;
    color: white;
    margin: 0;
  }

  @media (max-width: 426px) {
    height:30px;
    h5 {
      font-size: 10px;
    }
  }
`;
