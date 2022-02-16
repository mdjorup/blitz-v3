import './App.css';
import Auth from './pages/Auth.js'
import FindGroups from './pages/FindGroups.js'
import Group from './pages/Group.js'
import Home from './pages/Home.js'
import MakePicks from './pages/MakePicks.js'
import NFLStandings from './pages/NFLStandings.js'
import TeamPage from './pages/TeamPage';

import { useEffect } from 'react';

import {auth} from './firebase.js'

import axios from 'axios'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { API_KEY } from './admin';
import { useDispatch, useSelector } from 'react-redux';
import { setLogos } from './reducers/logosReducer';
import { setCurrentType, setCurrentYear, setCurrentWeek } from './reducers/seasonReducer';
import { setUser } from './reducers/userReducer';


function App() {

  

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);


  useEffect(() => {
    auth.onAuthStateChanged(firebaseUser => {
      dispatch(setUser(firebaseUser));
    })
  })
  

  useEffect(() => {
    const fetchLogos = async () => {
      await axios.get('http://localhost:3000/teams/logos')
        .then(response => {
          dispatch(setLogos(response.data))
        }).catch(error => {})
    }
    fetchLogos();

  }, [])

  // useEffect(() => {
  //   axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${API_KEY}`)
  //     .then(response => {
  //       dispatch(setCurrentYear(response.data))
  //     }).catch(error => console.log(error))
  //   axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${API_KEY}`)
  //     .then(response => {
  //       dispatch(setCurrentWeek(response.data))
  //       const today = new Date();
  //       if(today.getMonth() <= 1 && parseInt(response.data) <= 5){
  //         dispatch(setCurrentType("POST"));
  //       } else {
  //         dispatch(setCurrentType("REG"))
  //       }
  //     }).catch(error => console.log(error))
  // }, [])
  



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
        <Route path='/nfl/teams/:team' element={<TeamPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;

