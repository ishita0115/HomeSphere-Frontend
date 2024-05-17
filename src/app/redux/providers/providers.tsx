'use client'
const { Provider } = require('react-redux');
import { ReactNode } from 'react';
import { store, persistor } from '../store/store'

import { PersistGate } from "redux-persist/integration/react";


interface ProvidersProps {
    children: ReactNode; 
}

export function Providers({ children }: any) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
        </Provider>
    );
}