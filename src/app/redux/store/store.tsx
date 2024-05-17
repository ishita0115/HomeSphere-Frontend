import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authslice';
import storage from 'redux-persist/lib/storage'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // other reducers...
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
        ignoredActions:[FLUSH,REGISTER,REHYDRATE,PAUSE,PERSIST,PURGE],
    },
}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)