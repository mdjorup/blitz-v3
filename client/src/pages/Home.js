import React, {useState} from 'react';
import Header from '../components/Header';








function Home() {

  


  return (
    <div className="bg-backdrop flex flex-col h-screen">
      <Header />
      {/* body */}
      <div className='flex top-1'>
        <div className='flex-0.25'>
          Left sidebar
        </div>
        <div className='flex-0.75'>
          Center
        </div>

      </div>


      
    </div>
  );
}

export default Home;
