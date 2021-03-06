import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import { setLogos } from '../reducers/logosReducer';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const TeamEntry = ({nameKey, name, logo}) => {

  const navigate = useNavigate();

  return(
    <div className='flex items-center justify-between px-5 font-light hover:text-lightblue cursor-pointer'
      onClick={()=>navigate(`/nfl/teams/${nameKey}`)}>
      <p className=''>{name.substr(name.lastIndexOf(' ') + 1)}</p>
      {logo && <img className='h-8 w-8' src={logo}/>}

    </div>
  )

}

function Home() {

  //const teamsWithLogos = logos.map(entry => <TeamEntry name={entry.FullName} logo={entry.WikipediaLogoUrl}/>)
  const dispatch = useDispatch();
  const logos = useSelector((state) => state.logos.data);
  const seasonInfo = useSelector((state) => state.season)


  return (
    <div className="bg-backdrop min-h-screen">
      <Header />
      {/* body */}
      <div className='flex top-20 text-white px-40 pt-5'>
        <div className='flex-none w-52 bg-focus rounded mx-5'>
          <p className='text-xl font-semibold p-3 border-b border-subtle mb-1'>Teams</p>
          {logos && Object.keys(logos).map((key) => (<TeamEntry key={key} nameKey={key} name={logos[key].FullName} logo={logos[key].Logo}/>))}

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
