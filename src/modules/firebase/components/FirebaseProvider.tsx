import * as React from 'react';
import { useFirebaseApi } from '../useFirebaseApi';

import { FirebaseContext } from './FirebaseContext';

export const FirebaseProvider: React.FC = ({ children }) => {
  const firebaseApi = useFirebaseApi();

  return (
    <FirebaseContext.Provider value={firebaseApi}>
      {children}
    </FirebaseContext.Provider>
  );
};
