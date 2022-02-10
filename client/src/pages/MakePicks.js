import React, { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Header from '../components/Header';

//redux
import {connect, useDispatch, useSelector} from 'react-redux';
import { setLogos } from '../reducers/logosReducer';


const PickEntry = ({GameKey, Date, AwayTeam, AwayTeamStyle, HomeTeam, HomeTeamStyle, IsInProgress, IsOver, pick}) => {
  
  const unpickedStyle = "h-auto flex flex-1 p-2 items-center border-4 border-backdrop"
  const pickedStyle = "h-auto flex flex-1 p-2 items-center border-4 border-white"

  return (
    <div className=''>
      {(IsOver || IsInProgress) && <div className='my-5'>
        
      </div>}
      {IsOver && !IsInProgress && <div className='flex'>
        <div className={pick === AwayTeam ? pickedStyle : unpickedStyle} style={{'background-color': '#'+AwayTeamStyle.PrimaryColor}}>
          <img className='w-14' src={AwayTeamStyle.Logo}/>
          <p>{AwayTeamStyle.FullName}</p>
        </div>
        <div className=''>
          @
        </div>
        <div className={pick === HomeTeam ? pickedStyle : unpickedStyle} style={{'background-color': '#'+HomeTeamStyle.PrimaryColor}}>
          <p>{HomeTeamStyle.FullName}</p>
          <img className='w-14' src={HomeTeamStyle.Logo}/>
        </div>
        
      </div>}
    </div>
  )

}

function MakePicks({user, logos}) {

  const dispatch = useDispatch();
  const [games, setGames] = useState(null);

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
    pick='DAL'/>))
  }

  return (
    <div className='bg-backdrop min-h-screen'>
      <Header></Header>
      <div className='top-20 text-white mx-80'>
        {logos && games && renderGames()}
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