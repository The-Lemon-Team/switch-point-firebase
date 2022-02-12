import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthScreenContainer } from './modules/auth/containers';
import { PrivateRoute } from './modules/auth/containers';
import { BoardContainer } from './modules/board';
import { FirebaseProvider } from './modules/firebase/components/FirebaseProvider';

export const App = () => {
  return (
    <Router>
      <FirebaseProvider>
        <Routes>
        <Route
            path="/"
            element={
              <PrivateRoute>
                <BoardContainer />
              </PrivateRoute>
            }
          />
          <Route path="/auth" element={<AuthScreenContainer />} />
          <Route
            path="/board"
            element={
              <PrivateRoute>
                <BoardContainer />
              </PrivateRoute>
            }
          />
        </Routes>
      </FirebaseProvider>
    </Router>
  );
};
