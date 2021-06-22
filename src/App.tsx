import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Musician from './components/Musician/Musician';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';
import SearchPage from './components/SearchPage/SearchPage';
import { AuthProvider } from './context/AuthContext';
import { TMusicianData } from './Models/TMusicianData';
import { TSearchResult } from './Models/TSearchResult';
import { useAuth } from './context/AuthContext'
import Signup from './components/Signup/Signup';
import { TSources } from './Models/TSources';


function App() {
  const defaultMusicianSearch:TSearchResult = {
    id: '',
    musicianId: '',
    name: '',
    genres: [],
    origin: [],
}
const defaultMusician:TMusicianData = {
  id: '',
  name: '',
  genres: [],
  origin: [],
  shortDesc: '',
  yearsActive: '',
  imgBanner: '',
  imgMusician: '',
  members: [],
  discography: [],
  longDesc: {
      articleSections: [],
  },
  asociatedActs: [],
}

const defaultReference:TSources = {
  id:'',
  refs: []
}
  const [musicianSearch, setMusicianSearch] = useState(defaultMusicianSearch);
  const [musicianData, setMusicianData] = useState(defaultMusician);
  const [searchToPerform, setsearchToPerform] = useState('');
  const { currentUser } = useAuth();

function sendSearch(searchTerm:string) {  
  setsearchToPerform(searchTerm);
}

function forwardMusician(musican: TSearchResult){
  setMusicianSearch(musican)
}

function updateMusicianData(musician:TMusicianData){
  setMusicianData(musician);
}


  return (
    <Router>
      <div className='app'>
        {currentUser ? currentUser : ''}
        <Navbar/>
        <main>
          <Header forwardSearch={sendSearch}/>
          <AuthProvider>
            <Switch>
                <Route path='/' exact={true} component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/search'>
                  <SearchPage searchTerm={searchToPerform} sendMusician={forwardMusician}/>
                </Route>
                <Route path="/musician/:id" component={Musician}>
                  <Musician keepInMemory={updateMusicianData} musicianData={musicianData}/>
                </Route>
                <PrivateRoute path="/profile" component={Profile} />
                <Route path='*' component={NotFound} />
            </Switch>
          </AuthProvider>
        </main>
      </div>
    </Router>
  );
}

export default App;
