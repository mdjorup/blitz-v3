import React, { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Header from '../components/Header';

//redux
import {connect, useSelector} from 'react-redux';
import { setLogos } from '../reducers/logosReducer';
import Button from '../components/Button';


const PickEntry = ({GameKey, Date, AwayTeam, AwayTeamStyle, HomeTeam, HomeTeamStyle, IsInProgress, IsOver, pick, handleSelection}) => {
  
  const unpickedStyle = " flex flex-1 p-1 m-2 items-center justify-evenly border border-white cursor-pointer rounded-md"
  const pickedStyle = " flex flex-1 p-1 m-2 items-center justify-evenly border border-lightgray bg-lightgray text-focus cursor-pointer rounded-md"

  return (
    <div className='bg-focus'>
      {(IsOver || IsInProgress) && <div className='my-5'>
        
      </div>}
      {IsOver && !IsInProgress && <div className='flex'>
        <div className={pick === AwayTeam ? pickedStyle : unpickedStyle} 
          onClick={() => handleSelection(GameKey, AwayTeam)}>
          <img className='w-12 h-12' src={AwayTeamStyle.Logo}/>
          <p>{AwayTeamStyle.FullName}</p>
        </div>
        <div className='flex-1 flex justify-center items-center text-xl'>
          <p>@</p>
        </div>
        <div className={pick === HomeTeam ? pickedStyle : unpickedStyle}
          onClick={() => handleSelection(GameKey, HomeTeam)}>
          <p>{HomeTeamStyle.FullName}</p>
          <img className='w-12 h-12 ' src={HomeTeamStyle.Logo}/>
        </div>
        
      </div>}
    </div>
  )

}

function MakePicks({user, logos}) {

  const [games, setGames] = useState(null);

  const [picks, setPicks] = useState({});

  const seasonInfo = useSelector((state) => state.season)

  useEffect(() => {
    const fetchGames = async () => {
      await axios.get(`http://localhost:5000/games/${seasonInfo.year}/${seasonInfo.type}/${seasonInfo.week}`)
        .then(response => {
          setGames(response.data)
        }).catch(error => {})
    }
    fetchGames();

  }, [])

  useEffect(() => {
    //GET request to get user picks
    const fetchPicks = async () => {
      await axios.get(`http://localhost:5000/picks/${user.uid}/${seasonInfo.year}/${seasonInfo.type}/${seasonInfo.week}`)
        .then(response => {
          setPicks(response.data)
        }).catch(error => {})
    }
    fetchPicks();
  }, [])

  const handleSelection = (gameKey, selection) => {
    if(!picks.gameKey){
      setPicks({...picks, [gameKey]: selection})
    } else if(selection !== picks.gameKey){
      setPicks({...picks, [gameKey]: selection})
    } else if(selection !== picks.gameKey){
      setPicks({...picks, [gameKey]: selection})
    }
  }

  const handleSubmit = () => {
    //POST request to send picks data to DB
    axios.post(`http://localhost:5000/picks/${user.uid}/${seasonInfo.year}/${seasonInfo.type}/${seasonInfo.week}`, picks)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
  }

  const renderGames = () => {
    return games.map((game) => (<PickEntry 
    GameKey={game.GameKey} 
    Date={game.Date}
    AwayTeam={game.AwayTeam}
    AwayTeamStyle={logos[game.AwayTeam]}
    HomeTeam={game.HomeTeam}
    HomeTeamStyle={logos[game.HomeTeam]}
    IsInProgress={game.IsInProgress}
    IsOver={game.IsOver}
    pick={picks[game.GameKey]}
    handleSelection={handleSelection}/>))
  }

  return (
    <div className='bg-backdrop min-h-screen'>
      <Header></Header>
      <div className='top-20 text-white mx-96'>
        <div className=' flex justify-between items-center p-2 mt-5'>
          <p className='text-3xl font-bold'>Make Picks</p>
          <Button text='Reset' type='tertiary' onClick={() => setPicks({})}/>

        </div>
        {logos && games && renderGames()}
        <div className='flex justify-center pt-10 pb-96'>
          <Button text='Submit' type='primary' onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    logos: state.logos.data,
  }
}

export default connect(mapStateToProps)(MakePicks);