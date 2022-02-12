import { useCallback, useMemo } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { firebaseAuth } from './firebase';

export function useFirebaseAuth() {
  const [user, loading, error] = useAuthState(firebaseAuth, {});
  const userData = useMemo(() => user?.providerData[0], [user]);
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  const callback = useCallback(() => {
    signInWithGoogle().then(console.log).then(console.error);
  }, [signInWithGoogle]);

  error && console.error(error);

  return {
    user,
    loading,
    error,
    userData,
    signInWithGoogle: callback,
  };
}
