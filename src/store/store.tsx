import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  ADD,
  UPDATE,
  DELETE,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from "../util/constant";
import { ToastAction } from "../util/type";
import { Discussion } from "../util/type";

const initialDiscussionState: Discussion[] = [];

const tostify = (actionType: ToastAction) =>
  toast(
    actionType === ADD
      ? ADD_MESSAGE
      : actionType === UPDATE
      ? UPDATE_MESSAGE
      : DELETE_MESSAGE,
    { position: toast.POSITION.TOP_RIGHT }
  );

export const discussion = createSlice({
  name: "discussionReducer",
  initialState: initialDiscussionState,
  reducers: {
    createDiscussion: (
      state: Discussion[],
      action: PayloadAction<Discussion>
    ) => {
      tostify(ADD);

      return [action.payload, ...state];
    },
    deleteDiscussion: (
      state: Discussion[],
      action: PayloadAction<Discussion>
    ) => {
      tostify(DELETE);

      return state.filter((item: Discussion) => item.id !== action.payload.id);
    },

    updateDiscussion: (
      state: Discussion[],
      action: PayloadAction<Discussion>
    ) => {
      tostify(UPDATE);

      return state.map((discussion: Discussion) =>
        discussion.id === action.payload.id
          ? { ...discussion, title: action.payload.title }
          : discussion
      );
    },
  },
});

export const store = configureStore({ reducer: discussion.reducer });
export const { createDiscussion, deleteDiscussion, updateDiscussion } =
  discussion.actions;
