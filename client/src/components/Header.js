import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import {SiBetfair} from 'react-icons/si';

function Header() {

  const navigate = useNavigate();
  
  


  //Need to implement clicking operations
  return (
    <div className="h-20 w-full z-50 absolute top-0 bg-transparent border-b border-subtle flex items-center justify-between">
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
        <div className='flex px-5 space-x-4'>
          <Button text='Login' type='tertiary' onClick={()=> navigate('/login')}></Button>
          <Button text='Register' type='primary' onClick={() =>navigate('/register')}></Button>
        </div>
      </div>

    </div>
  );
}

export default Header;
