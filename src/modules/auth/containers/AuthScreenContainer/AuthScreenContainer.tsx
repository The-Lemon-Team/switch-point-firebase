import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirebaseAuth } from '../../../firebase/useFirebaseAuth';
import AuthScreen from '../../components/AuthScreen/AuthScreen';

export function AuthScreenContainer() {
  const { user, signInWithGoogle } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/board');
    }
  }, [navigate, user]);

  return <AuthScreen onGoogleLogin={signInWithGoogle} />;
}
