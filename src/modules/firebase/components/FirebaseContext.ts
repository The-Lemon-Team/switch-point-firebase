import { createContext } from 'react';

import { IFirebaseApi } from '../interfaces/IFirebaseApi';

export const FirebaseContext = createContext<IFirebaseApi>({} as IFirebaseApi);
