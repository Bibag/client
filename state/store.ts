import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';
import rootSaga from './saga';
import { persistReducer, persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user', 'currentMessage'],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/FLUSH',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(middleware),
});

store.subscribe(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('store', store.getState());
  }
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
