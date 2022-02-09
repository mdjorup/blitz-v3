import React, { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Header from '../components/Header';

//redux
import {connect, useDispatch, useSelector} from 'react-redux';
import { setLogos } from '../reducers/logosReducer';


const PickEntry = ({GameKey, Date, AwayTeam, AwayTeamStyle, HomeTeam, HomeTeamStyle, IsInProgress, IsOver}) => {
    
  return (
    <div className='bg-focus rounded '>
      {(IsOver || IsInProgress) && <div className=''>
        
      </div>}
      {!IsOver && !IsInProgress && <div className=''>
        {!AwayTeamStyle && "No away team style!"}
        {AwayTeamStyle && "Away Team Style"}
        {JSON.stringify(AwayTeamStyle)}
        {JSON.stringify(HomeTeamStyle)}
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
    IsOver={game.IsOver}/>))
  }

  return (
    <div className='bg-backdrop min-h-screen'>
      <Header></Header>
      <div className='top-20 text-white mx-80 h-20 '>
        {logos && games && renderGames()}
        {logos && <p>Logos are here</p>}
        {games && <p>Games are here</p>}
        {logos && games && <p>Both logos and games are here</p>}
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