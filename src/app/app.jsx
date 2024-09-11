import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import SignUp from '../pages/signUp/SignUp';
import SignIn from '../pages/signIn/SignIn';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
     </Routes>
    </>
  );
}

export default App;
