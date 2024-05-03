'use client'
const { Provider } = require('react-redux');
import { ReactNode } from 'react'; // Import ReactNode type for children prop
import { store, persistor } from '../store/store'

import { PersistGate } from "redux-persist/integration/react";


interface ProvidersProps {
    children: ReactNode; // Specify children prop type
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