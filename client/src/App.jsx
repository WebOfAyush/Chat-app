import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import HomePage from './pages/home/HomePage';
import {getMe} from "./api/authAPI"
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from './context/authContext';


function App() {
  const { authUser} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={ !authUser ? <SignUp/> : <Navigate to="/"/> } />
        <Route path='/login' element={ !authUser ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/signup"/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
