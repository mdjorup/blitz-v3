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
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Auth type='login'/>}/>
        <Route path='/register' element={<Auth type='register'/>}/>
        <Route path='/groups/find' element={<FindGroups />}/>
        <Route path='/groups/:groupid' element={<Group />}/>
        <Route path='/makepicks' element={<MakePicks />}/>
        <Route path='/nfl/standings' element={<NFLStandings />}/>
        <Route path='/nfl/scores' element={<Scores />}/>
      </Routes>
      
    </Router>
  );
}

export default App;

