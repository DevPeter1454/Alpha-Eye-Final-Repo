import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "../store/AuthSlice";
// import { createLogger } from "redux-logger";

import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// const logger = createLogger();

const reducer = combineReducers({
  auth: AuthSlice,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
  // }).concat(logger),
});

export const persistor = persistStore(store);
