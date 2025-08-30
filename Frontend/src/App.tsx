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
        <Route path='/login' element={<SignInForm/>}></Route>
        <Route path='/error' element={<ErrorPage/>}></Route>
        <Route path='/library' element={<SearchBar/>}></Route>
        <Route path='/library/fav' element={user ? <FavCard /> : <Landing /> }></Route>
        <Route path='/quiz/random' element={<QuickQuiz />}></Route>
      </Routes>
    </div>
    </>

  );
}

export default App
