import React from 'react';
import Button from './Button';
import {SiBetfair} from 'react-icons/si';

function Header() {

  //Need to implement clicking operations
  return (
    <div className="h-20 w-full z-50 absolute top-0 bg-transparent border-b border-slate-700 flex items-center justify-between">
      {/* header left */}
      <div className='flex items-center space-x-4 pl-5 cursor-pointer' >
        <SiBetfair color='#3b82f6' size={40} />
        <div className='text-blue-50 text-2xl font-semibold'>Blitz</div>
      </div>
      {/* header right  */}
      <div className='flex'>
        <div className='flex border-r border-slate-700 px-5'>
          <Button text="Make Picks" type='tertiary' ></Button>
          <Button text="Scores" type='tertiary'></Button>
          <Button text='NFL Standings' type='tertiary'></Button>
          <Button text='Groups' type='tertiary'></Button>
        </div>
        <div className='flex px-5 space-x-4'>
          <Button text='Login' type='tertiary'></Button>
          <Button text='Register' type='primary'></Button>
        </div>
      </div>

    </div>
  );
}

export default Header;
