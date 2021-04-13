import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from "@reduxjs/toolkit";

import PostsSlice from "./slice/posts";
import CommentsSlice from "./slice/comments";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  posts: PostsSlice.reducer,
  comments: CommentsSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export const persistor = persistStore(store);
export default store;
