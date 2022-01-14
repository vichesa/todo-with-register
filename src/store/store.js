import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { todoAdapter } from "./todoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PURGE,
  PAUSE,
  PERSIST,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { userSlice } from "./userSlice";

const preloadedState = {
  ids:['Nbp7NI9OzLmWRmea2K-8Q'],
  entities: {"Nbp7NI9OzLmWRmea2K-8Q" : {id: "Nbp7NI9OzLmWRmea2K-8Q", todo: "work", deadline: "2022-1-1", completed:false}},
  deletedTodos: []
}

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST],
      },
    }),
  devTools: true,
  preloadedState,
});

export const persistor = persistStore(store);
export const configSignUp = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
