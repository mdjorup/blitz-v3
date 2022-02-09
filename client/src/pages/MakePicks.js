import React, { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Header from '../components/Header';

//redux
import {connect, useSelector} from 'react-redux';

function MakePicks({user}) {

  const [games, setGames] = useState(null);

  const seasonInfo = useSelector((state) => state.season)

  useEffect(() => {
    if (games){
      return
    }
    axios.get(`http://localhost:5000/games/${seasonInfo.year}/${seasonInfo.type}/${seasonInfo.week}`)
      .then(response => {
        setGames(response.data)
      }).catch(error => {})

  }, [])

  return (
    <div className='bg-backdrop min-h-screen'>
      <Header></Header>
      {!user && <p>THERE IS NO USER</p>}
      <div className='top-20 text-white mx-52 h-20 border border-white'>
        {games && JSON.stringify(games)}

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps)(MakePicks);