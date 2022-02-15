import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';

import axios from 'axios';

import {useSelector} from 'react-redux'


const Game = ({gameData, awayLogo, homeLogo}) => {

  const gameDate = new Date(gameData.Date)


  return (
    <div className='bg-focus flex h-10 items-center'>
      <p className=''>{gameDate.getUTCMonth()+1}/{gameDate.getUTCDate()}</p>
      <img className='h-4/5' src={awayLogo}/>
      <img className='h-4/5' src={homeLogo}/>
    </div>
  )

}


function TeamPage() {

  const {team} = useParams();
  const year = useSelector((state) => state.season.year);

  const logos = useSelector((state) => state.logos.data);

  const [standingsInfo, setStandingsInfo] = useState({});
  const [schedule, setSchedule] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:5000/teams/standings/${year}/${team}`)
      .then(response => {
        setStandingsInfo(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:5000/teams/schedule/${year}/${team}`)
      .then(response => {
        setSchedule(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const getRankString = (rank) => {
    if(rank === 1) {return "1st"}
    if(rank === 2) {return "2nd"}
    if(rank === 3) {return "3rd"}
    if(rank === 4) {return "4th"}
  }


  return (
    <div>
      <Header />
      <div className='min-h-screen bg-backdrop px-56 py-5 text-white'>
        {/* Team Header */}
        <div className='flex rounded-t-xl items-center p-2' style={
          {"background-color": '#'+logos[team].PrimaryColor,"border-bottom": `3px solid ${"#"+logos[team].SecondaryColor}`}
        }>
          <img className='ml-5 h-40 w-40'src={logos[team].Logo} />
          <div className='ml-10'>
            <p className='text-4xl font-bold mb-2'>{logos[team].FullName}</p>
            <p>{standingsInfo.Wins}-{standingsInfo.Losses}-{standingsInfo.Ties}, {getRankString(standingsInfo.DivisionRank)} in {standingsInfo.Conference} {standingsInfo.Division}</p>
          </div>
        </div>
        {/* Team Body */}
        <div className='rounded-b-xl'>
          {schedule && schedule.map((game) => (<Game gameData={game} awayLogo={logos[game.AwayTeam].Logo} homeLogo={logos[game.HomeTeam].Logo}/>) )}
        </div>

      </div>
    </div>
  )
}

export default TeamPage