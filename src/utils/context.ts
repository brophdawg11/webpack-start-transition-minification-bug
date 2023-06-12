import React from 'react';
import { APIAccessor } from './api';

export interface AppContextData {
    user?: undefined;
    userLoaded: boolean;
    setUser: () => void;
    refreshUser: () => undefined;
    apiAccessor: APIAccessor;
}

export const AppContext = React.createContext<AppContextData>({} as AppContextData);
