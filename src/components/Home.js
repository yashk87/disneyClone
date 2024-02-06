import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import Viewers from './Viewers';
import Movies from './Movies';
import { Link } from 'react-router-dom';
import useStore from './store';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'lottie-react'
import animationData from "./Animation - 1707200464653.json"
import { auth } from "./config";
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { firestore } from './config';
import { onAuthStateChanged } from 'firebase/auth';
import userEvent from '@testing-library/user-event';


function Home() {
    const [data, setData] = useState([])
    const { loading, setLoading } = useStore();
    const loadingRef = useRef()
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('email') !== null;
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        console.log(localStorage);

        if (isLoggedIn && !hasRefreshed) {
            localStorage.setItem('hasRefreshed', 'true');
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const colRef = collection(firestore, 'users');
                    const snapShots = await getDocs(colRef);
                    const docs = snapShots.docs.map((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        return data;
                    });

                    const userExists = docs.some((userData) => userData.email === user.email);

                    if (!userExists) {
                        const result = await addDoc(collection(firestore, 'users'), {
                            email: user.email
                        });

                        console.log('Document added successfully:', result);

                        setData([...docs, { email: user.email, id: result.id }]);
                    }
                } catch (error) {
                    console.error('Error adding document:', error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setLoading(false);
        }, animationData.op * 2 * 1000);
        setLoading(false)
    };

    // useEffect(() => {
    //     (async () => {
    //         const result = onAuthStateChanged(auth, async (user) => {
    //             try {
    //                 const colRef = collection(firestore, 'users2')
    //                 const snapShots = await getDocs(colRef)
    //                 const docs = snapShots.docs.map(async (doc) => {
    //                     const data = doc.data()

    //                     return data


    //                 })
    //                 console.log(docs);

    //                 if (!present) {
    //                     const result = await addDoc(collection(firestore, 'users2'), {
    //                         email: user.email
    //                     });
    //                     console.log('Document added successfully:', result);

    //                 }


    //             } catch (error) {
    //                 console.error('Error adding document:', error);
    //             }
    //         })
    //     })
    //         ()
    // }, [])

    return (
        <Container className='relative'>
            {loading ? (
                <div className='w-full h-full right-0 bottom-0 left-0 flex justify-center items-center absolute bg-black z-[1024]'>
                    <Lottie
                        animationData={animationData}
                        lottieRef={loadingRef}
                        loop={false}
                        className='sm:w-5 sm:h-5'
                        style={{ width: "200px", height: "200px", margin: "0px", padding: "0px" }}
                        onComplete={handleAnimationComplete}
                    />
                </div>
            ) : (
                <>
                    <ImageSlider />
                    <Viewers />
                    <Movies />
                </>
            )}
        </Container>
    )
}

export default Home;

const Container = styled.main`
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

            @media (max-width:425px){
                padding - top:48px;
    }

            `;



