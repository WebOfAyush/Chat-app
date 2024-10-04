import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import HomePage from './pages/home/HomePage';

function App() {
  const authUser = false;
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
