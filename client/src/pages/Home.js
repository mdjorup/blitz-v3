import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import { setLogos } from '../reducers/logosReducer';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import {connect} from 'react-redux'


const TeamEntry = ({name, logo}) => {
  return(
    <div className='flex items-center justify-between px-5 font-light hover:text-lightblue cursor-pointer'>
      <p className=''>{name.substr(name.lastIndexOf(' ') + 1)}</p>
      <img className='h-8 w-8' src={logo}/>

    </div>
  )

}

function Home() {

  //const teamsWithLogos = logos.map(entry => <TeamEntry name={entry.FullName} logo={entry.WikipediaLogoUrl}/>)
  const dispatch = useDispatch();
  const logos = useSelector((state) => state.logos.data);
  const seasonInfo = useSelector((state) => state.season)


  useEffect(() => {
    
    if (logos) {return}
    axios.get('http://localhost:3000/teams/logos')
      .then(response => {
        dispatch(setLogos(response.data))
      }).catch(error => {})

  }, [])

  return (
    <div className="bg-backdrop min-h-screen">
      <Header />
      {/* body */}
      <div className='flex top-20 text-white px-40 pt-5'>
        <div className='flex-none w-52 bg-focus rounded mx-5'>
          <p className='text-xl font-semibold p-3 border-b border-subtle mb-1'>Teams</p>
          {logos && logos.map((entry) => (<TeamEntry key={entry.Key} name={entry.FullName} logo={entry.WikipediaLogoUrl}/>))}
          {/* {teamsWithLogos} */}

        </div>
        <div className='flex-1'>
          <div className='bg-focus  rounded'>
            User Stats if user or global stats if no user
          </div>
          <br></br>
          <div className='bg-focus  rounded'>
            {seasonInfo.year}
            {seasonInfo.type}
            {seasonInfo.week}
          </div>
        </div>

      </div>

    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     logos: state.logos.data,
//   }
// }

export default Home;
