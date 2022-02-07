import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect, useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../reducers/userReducer';

import Button from './Button';
import {SiBetfair} from 'react-icons/si';
import {CgProfile} from 'react-icons/cg';
import {auth} from '../firebase.js'
import {signOut} from 'firebase/auth';

function Header({user}) {

  //const user = //useSelector((state) => state.user.user) // this refers to the reducer
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("logout pressed")
    signOut(auth).then(() => {
      dispatch(clearUser())
      navigate('/')
      console.log("Success")
    }).catch((error) => {
      console.log("Error Logging Out")
    })
  }

  //Need to implement clicking operations
  return (
    <div className="h-20 w-full z-50 sticky top-0 bg-backdrop border-b border-subtle flex items-center justify-between">
      {/* header left */}
      <div className='flex items-center space-x-4 pl-5 cursor-pointer' >
        <SiBetfair color='#22D3EE' size={40} />
        <div className='text-white text-2xl font-semibold'>Blitz</div>
      </div>
      {/* header right  */}
      <div className='flex'>
        <div className='flex border-r border-white px-5'>
          <Button text="Make Picks" type='tertiary' ></Button>
          <Button text="Scores" type='tertiary'></Button>
          <Button text='NFL Standings' type='tertiary'></Button>
          <Button text='Groups' type='tertiary'></Button>
        </div>
        <div className='flex px-5 space-x-4 items-center'>
          {!user && <Button text='Login' type='tertiary' onClick={()=> navigate('/login')}></Button>}
          {!user && <Button text='Register' type='primary' onClick={() =>navigate('/register')}></Button>}
          {user && <p className='text-lightblue'>{user.displayName}</p>}
          {user && <Button text='Log out' type='tertiary' onClick={handleLogout}></Button>}
          {user && <CgProfile color='#CCCCCC' size={25}/>}


        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps)(Header);
