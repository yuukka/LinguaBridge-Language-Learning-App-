// src/App.jsx

import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import Menu from './components/Menu/Menu';
import Landing from './components/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import background from "./assets/background.jpeg"
import ErrorPage from "./components/ErrorPage"
import MainPage from "./components/MainPage/MainPage"
import SearchBar from "./components/SearchBar/SearchBar"
import { useUser } from './contexts/UserContext';
import FavCard from './components/favCard/favCard';
import QuickQuiz from './components/QuickQuiz/QuickQuiz';
import QuestMap from './components/QuizQuest/QuestMap';
import Quest from './components/QuizQuest/Quest';
import ProfileForm from './components/ProfileForm/ProfileForm';
import Profile from './components/Profile/Profile';
import Badge from './components/Badge/Badge'; 

const App = () => {
  const { user } = useUser();

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center bg-fixed z-0"
       style={{ backgroundImage: `url(${background})` }}
    >
      <Menu/>
      <Routes>
         <Route path='/' element={user ? <MainPage /> : <Landing /> }></Route>
        <Route path='/signup' element={<SignUpForm/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/profile/create' element={<ProfileForm/>}></Route>
        <Route path='/login' element={<SignInForm/>}></Route>
        <Route path='/error' element={<ErrorPage/>}></Route>
        <Route path='/library' element={<SearchBar/>}></Route>
        <Route path='/library/fav' element={user ? <FavCard /> : <Landing /> }></Route>
        <Route path='/quiz/random' element={<QuickQuiz />}></Route>
        <Route path='/quiz/quest' element={user ? <QuestMap /> : <Landing /> }></Route>
        <Route path='/quiz/quest/:level' element={user ? <Quest /> : <Landing /> }></Route>
        <Route path='/quiz/badges/' element={user ? <Badge /> : <Landing /> }></Route>
      </Routes>
    </div>
    </>

  );
}

export default App
