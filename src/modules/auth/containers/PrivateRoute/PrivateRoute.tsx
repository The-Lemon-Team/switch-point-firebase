import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../../firebase/useFirebaseAuth';

export const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useFirebaseAuth();

  return user ? <>{children}</> : <Navigate to="/auth" />;
};
