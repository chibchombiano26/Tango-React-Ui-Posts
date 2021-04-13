import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api/posts";

type postsSliceProps = {
  posts: any;
};

const initializeData = (data: any) => {
  return data.map((e: any) => {
    return { ...e, quantity: 1 };
  });
};

const getPosts = createAsyncThunk("posts/getPosts", async () => {
  return await api.getPosts();
});

const postsSlice = createSlice({
  name: "PostsState",
  initialState: {
    posts: []
  } as postsSliceProps,
  reducers: {
    setPosts: (state, { payload }) => {
      const data = payload;
      return data;
    }
  },
  extraReducers: {
    [getPosts.fulfilled.toString()]: (state, { payload }) => {
      const data = initializeData(payload);
      return { ...state, posts: data };
    }
  }
});

export default postsSlice;
export const postActions = {
  getPosts,
  ...postsSlice.actions
};
