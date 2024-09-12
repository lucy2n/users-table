import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/Main';
import SignUp from '../../pages/sign-up/sign-up';
import SignIn from '../../pages/sign-in/sign-in';
import ProtectedRoute from '../protected-route/protected-route';

function App() {
  return (
    <>
      <Routes>
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } 
        />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;