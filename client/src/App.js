import './App.css';
import Auth from './pages/Auth.js'
import FindGroups from './pages/FindGroups.js'
import Group from './pages/Group.js'
import Home from './pages/Home.js'
import MakePicks from './pages/MakePicks.js'
import NFLStandings from './pages/NFLStandings.js'
import Scores from './pages/Scores.js'

import { useEffect } from 'react';

import axios from 'axios'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { API_KEY } from './admin';
import { useDispatch } from 'react-redux';
import { setCurrentType, setCurrentYear, setCurrentWeek } from './reducers/seasonReducer';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${API_KEY}`)
      .then(response => {
        dispatch(setCurrentYear(response.data))
      }).catch(error => console.log(error))
    axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${API_KEY}`)
      .then(response => {
        dispatch(setCurrentWeek(response.data))
        const today = new Date();
        if(today.getMonth() <= 1 && parseInt(response.data) <= 5){
          dispatch(setCurrentType("POST"));
        } else {
          dispatch(setCurrentType("REG"))
        }
      }).catch(error => console.log(error))
  }, [])
  



  // on page load, need to add user from firebase auth to redux
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/login' element={<Auth type='login'/>}/>
        <Route exact path='/register' element={<Auth type='register'/>}/>
        <Route exact path='/groups/find' element={<FindGroups />}/>
        <Route exact path='/groups/:groupid' element={<Group />}/>
        <Route exact path='/makepicks' element={<MakePicks />}/>
        <Route exact path='/nfl/standings' element={<NFLStandings />}/>
        <Route exact path='/nfl/scores' element={<Scores />}/>
      </Routes>
      
    </Router>
  );
}

export default App;

