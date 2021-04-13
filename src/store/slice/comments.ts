import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api/comments";

type commentsSliceProps = {
  comments: any;
};

const getComments = createAsyncThunk("comments/getComments", async (opts) => {
  return await api.getComments(opts.id);
});

const commentsSlice = createSlice({
  name: "CommentsState",
  initialState: {
    comments: []
  } as commentsSliceProps,
  reducers: {
    setComments: (state, { payload }) => {
      const data = payload;
      return data;
    },
    addComment: (state, { payload }) => {
      state.comments.push(payload);
      return state;
    }
  },
  extraReducers: {
    [getComments.fulfilled.toString()]: (state, { payload }) => {
      const data = payload;
      return { ...state, comments: data };
    }
  }
});

export default commentsSlice;
export const commentsActions = {
  getComments,
  ...commentsSlice.actions
};
