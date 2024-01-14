import React, { useEffect, useState } from 'react'
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const SignIn = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    // const [userPhoto, setUserPhoto] = useState('')

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
            console.log(data);

        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

    return (
        <div className='w-full h-full absolute'>
            {value ? navigate('/home') :
                (
                    <div className='w-full h-full flex justify-center items-center'>
                        <Card
                            className='mb-15 flex flex-col justify-center items-center w-[300px] h-[350px] bg-slate-400 bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-300 rounded-md p-8'
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1701483652511-7a419837eedb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF5JTIwc2NlbmV8ZW58MHx8MHx8fDA%3D")', backgroundSize: 'cover' }}
                        >

                            <h1 className='text-4xl mb-5'>Welcome!</h1>
                            <p className='mb-5'>sign in to continue</p>
                            <button
                                onClick={handleClick}
                                className='flex items-center gap-3  bg-violet-700 hover:bg-violet-900 hover:text-slate-100 text-white font-extrabold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
                            >
                                sign in with 
                                <img className='w-[30px] h-[30px]' src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G"></img>
                            </button>
                        </Card>
                    </div>



                )
            }
        </div>
    )
}

// export const userPhoto = () => userPhoto
export default SignIn


const Card = styled.div`
    position: relative;
    z-index: 1;  /* Set a higher z-index for the container */

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        z-index: -1;  /* Set a lower z-index for the background */
    }
`;