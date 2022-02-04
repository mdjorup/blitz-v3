import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.js';
import {SiBetfair} from 'react-icons/si'

import {auth} from '../firebase.js';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {Timestamp} from 'firebase/firestore';

import { useDispatch } from 'react-redux';
import {setUser} from '../reducers/userReducer.js';


function Auth({type}) {

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true)
    setErrorMessage("");
    if(!displayName || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        //authenticate and add to firebase
        await updateProfile(userCredential.user, {
          displayName: displayName,
        })
        //add user to state
        dispatch(setUser(userCredential.user))
        //add user to db
        await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            _id: userCredential.user.uid,
            displayName: displayName,
            email: email,
            password: password,
            time: Timestamp.now().toDate(),
          })
        })

        setLoading(false)
        navigate('/')
        
      })
      .catch((error) => {
        setLoading(false)
        setErrorMessage(error.code)
      })
  }

  const handleLogin = () => {
    setLoading(true)
    setErrorMessage("")
    if(!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    };
    signInWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        //add login time to db
        dispatch(setUser(userCredential.user));
        await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            _id: userCredential.user.uid,
            time: Timestamp.now().toDate(),
          })
        })

        setLoading(false)
        navigate('/')
      }).catch((error) => {
        setLoading(false);
        setErrorMessage(error.code);
      })

  }

  return (
    <div className='bg-backdrop w-screen h-screen flex flex-col'>
      <div className="h-20 w-full bg-transparent flex items-center justify-between">
        {/* head er left */}
        <div className='flex items-center space-x-4 pl-5 cursor-pointer' onClick={() => navigate('/')}>
          <SiBetfair color='#22D3EE' size={40} />
          <div className='text-white text-2xl font-semibold'>Blitz</div>
        </div>
        {/* header right  */}
        <div className='flex px-10'>
          {type === 'register' && <Button text='Login' type='secondary' onClick={()=> navigate('/login')}></Button>}
          {type === 'login' && <Button text='Register' type='secondary' onClick={() =>navigate('/register')}></Button>}
        </div>
      </div>
      {/* Auth body */}

      <div className='flex justify-center pt-20 text-white'>
        <div className="flex flex-col w-1/4 rounded-xl bg-focus p-5 text-white space-y-3.5 text-sm">
          <div className="text-lightblue text-2xl font-semibold">
            {type === 'register' ? "Create a Blitz Account" : "Log In to Blitz"}
          </div>
          {type==='register' && <div className="flex flex-col space-y-1">
            <label>Display Name</label>
            <input className='outline-0 bg-focus border border-gray rounded p-2 hover:border-lightgray focus:border-lightblue' 
              type='text'
              onChange={event=>setDisplayName(event.target.value)}></input>
          </div>}
          <div className="flex flex-col space-y-1">
            <label>Email</label>
            <input className='outline-0 bg-focus border border-gray rounded p-2 hover:border-lightgray focus:border-lightblue' 
              type='email'
              onChange={event => setEmail(event.target.value)}></input>
          </div>
          <div className="flex flex-col space-y-1">
            <label>Password</label>
            <input className='outline-0 bg-focus border border-gray rounded p-2 hover:border-lightgray focus:border-lightblue' 
              type='password' 
              onChange={event => setPassword(event.target.value)}></input>
          </div>
          <p className='text-error'>{errorMessage}</p>
          <div className='text-white flex justify-center'>
            <Button className='object-center' text='Submit' type='primary' onClick={type==='register' ? handleRegister : handleLogin}></Button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Auth;
