import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';

import axios from 'axios';

import {useSelector} from 'react-redux'


const Game = ({gameData, awayLogo, homeLogo, teamPage}) => {

  const gameDate = new Date(gameData.Date)

  const centerStyling = () => {
    
    if(teamPage === gameData.AwayTeam){
      if(gameData.AwayScore > gameData.HomeScore){
        return 'text-win'
      } else if(gameData.AwayScore < gameData.HomeScore) {
        return 'text-loss'
      } else {
        return 'text-tie'
      }
    } else {
      if(gameData.AwayScore < gameData.HomeScore){
        return 'text-win'
      } else if(gameData.AwayScore > gameData.HomeScore) {
        return 'text-loss'
      } else {
        return 'text-tie'
      }
    }
  }


  return (
    <div className='bg-focus flex h-12 items-center border-b border-gray'>
      <p className='px-2'>{gameDate.getUTCMonth()+1}/{gameDate.getUTCDate()}</p>
      <div className='flex justify-evenly items-center w-full'> 
        <img className='h-8 w-8' src={awayLogo}/>
        <p>{gameData.AwayTeam}</p>
        {gameData.Quarter && <div className='flex flex-col items-center justify-center p-1 rounded'> 
          <p className={'text-xs'}>{gameData.AwayScore}-{gameData.HomeScore}</p>
          <p className='text-xs'>Final</p>
        </div>}
        {!gameData.Quarter && <p>@</p>}
        <p>{gameData.HomeTeam}</p>
        <img className='h-8 w-8' src={homeLogo}/>
      </div>
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
          {schedule && schedule.map((game) => (<Game gameData={game} awayLogo={logos[game.AwayTeam].Logo} homeLogo={logos[game.HomeTeam].Logo} teamPage={team}/>) )}
        </div>

      </div>
    </div>
  )
}

export default TeamPage