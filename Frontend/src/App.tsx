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

import { useUser } from './contexts/UserContext';


const App = () => {
  const { user } = useUser();

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center z-1"
       style={{ backgroundImage: `url(${background})` }}
    >
      <Menu/>
      <Routes>
         <Route path='/' element={user ? <MainPage /> : <Landing /> }></Route>
        <Route path='/signup' element={<SignUpForm/>}></Route>
        <Route path='/login' element={<SignInForm/>}></Route>
        <Route path='/error' element={<ErrorPage/>}></Route>
      </Routes>
    </div>
    </>

  );
}

export default App
