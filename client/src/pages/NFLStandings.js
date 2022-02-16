import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Division = ({conference, division, data}) => {

  const logos = useSelector((state) => state.logos.data);

  const navigate = useNavigate();


  const Rank = ({rank, team, logo, wins, losses, ties}) => {
    return (
      <div className='flex border-t border-subtle h-10 items-center'>
        <div className='w-8 flex-none'>{rank}</div>
        <div className='flex flex-1 items-center space-x-3 cursor-pointer' onClick={()=>navigate(`/nfl/teams/${team}`)}>
          <p>{team}</p>
          <img className='w-8 h-8' src={logo}/>
        </div>
        <p>{wins}-{losses}-{ties}</p>
      </div>
    )
  }




  return (
    <div className='bg-focus mb-5 rounded-lg px-2'>
      <p className='text-xl border-b-2 border-lightgray py-1'>{conference} {division !== null && division}</p>
      {data && data.map((entry, index) => (<Rank rank={index+1} team={entry.Team} logo={logos[entry.Team].Logo} wins={entry.Wins} losses={entry.Losses} ties={entry.Ties}/>) )}
    </div>
  )

}


function NFLStandings() {

  const [standings, setStandings] = useState([])

  const year = useSelector((state) => state.season.year);

  const [setting, setSetting] = useState("Division");


  useEffect(() => {
    axios.get(`http://localhost:5000/teams/standings/${year}/all`)
      .then(response => {
        setStandings(response.data)
      }).catch(error => {

      })
  }, [year])
  


  const getDivisonData = (conf, div=null) => {
    if(!div) {
      return standings.filter((entry) => (entry.Conference === conf)).sort((a, b) => parseInt(a.ConferenceRank) - parseInt(b.ConferenceRank))
    } else {
      return standings.filter((entry) => (entry.Conference === conf && entry.Division === div)).sort((a, b) => parseInt(a.ConferenceRank) - parseInt(b.ConferenceRank))
    }

  }



  return (
    <div className='bg-backdrop min-h-screen text-lightgray'>
      <Header />
      <div className='mx-64 mt-5'>
        <p className='text-4xl font-semibold mb-5'>Standings</p>
        <div className='flex my-5'>
          <button className={setting==='Division' ? 'p-3 text-lightblue border-b border-lightblue' : 'p-3 border-b border-backdrop'} onClick={()=>setSetting('Division')}>
            Division
          </button>
          <button className={setting==='Conference' ? 'p-3 text-lightblue border-b border-lightblue' : 'p-3 border-b border-backdrop'} onClick={()=>setSetting('Conference')}>
            Conference
          </button>
        </div>
        <div className='flex space-x-5'>
          <div className='nfc flex-1'>
            {setting === 'Conference' && <Division conference='NFC' data={getDivisonData("NFC")}/> }
            {setting === 'Division' && <Division conference='NFC' division='North' data={getDivisonData('NFC', "North")}/> }
            {setting === 'Division' && <Division conference='NFC' division='East' data={getDivisonData('NFC', "East")}/> }
            {setting === 'Division' && <Division conference='NFC' division='South' data={getDivisonData('NFC', "South")}/> }
            {setting === 'Division' && <Division conference='NFC' division='West' data={getDivisonData('NFC', "West")}/> }
          </div>
          <div className='afc flex-1'>
            {setting === 'Conference' && <Division conference='AFC' data={getDivisonData("AFC")}/> }
            {setting === 'Division' && <Division conference='AFC' division='North' data={getDivisonData('AFC', "North")}/> }
            {setting === 'Division' && <Division conference='AFC' division='East' data={getDivisonData('AFC', "East")}/> }
            {setting === 'Division' && <Division conference='AFC' division='South' data={getDivisonData('AFC', "South")}/> }
            {setting === 'Division' && <Division conference='AFC' division='West' data={getDivisonData('AFC', "West")}/> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFLStandings;
