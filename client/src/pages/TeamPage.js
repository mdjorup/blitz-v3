import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';

import {useSelector} from 'react-redux'

function TeamPage() {

  const {team} = useParams();

  const logos = useSelector((state) => state.logos.data);


  return (
    <div>
      <Header />
      <div className='min-h-screen bg-backdrop px-56 py-5 text-white'>
        {/* Team Header */}
        <div className='flex rounded' style={{"background-color": '#'+logos[team].PrimaryColor}}>
          <img className='h-40 w-40'src={logos[team].Logo} />
          <p>{logos[team].FullName}</p>
        </div>
        {/* Team Body */}
        <div className=''>
          
        </div>

      </div>
    </div>
  )
}

export default TeamPage