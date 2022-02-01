import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.js';
import {SiBetfair} from 'react-icons/si'

function Auth({type}) {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {

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

      <div className='flex justify-center pt-20'>
        <div className="flex flex-col w-1/4 rounded-xl bg-focus p-5">

          {type === 'register' ? "Register" : "Login"}
          <label classname=" outline-none focus:border-0 focus:outline-none">Username</label>
          <input type='text'></input>
          <label>Email</label>
          <input type='email'></input>
          <label>Password</label>
          <input type='password'></input>
          <Button className='object-center' text='Submit' type='primary'></Button>

        </div>
      </div>

    </div>
  );
}

export default Auth;
