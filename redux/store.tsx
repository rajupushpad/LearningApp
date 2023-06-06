import { legacy_createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export { store, persistor };
