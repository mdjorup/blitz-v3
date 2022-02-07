import './App.css';
import Auth from './pages/Auth.js'
import FindGroups from './pages/FindGroups.js'
import Group from './pages/Group.js'
import Home from './pages/Home.js'
import MakePicks from './pages/MakePicks.js'
import NFLStandings from './pages/NFLStandings.js'
import Scores from './pages/Scores.js'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {



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

