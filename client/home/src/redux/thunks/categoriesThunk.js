import { createAsyncThunk } from "@reduxjs/toolkit";
import categoriesApi from "../../apis/categoriesApi";

export const fetCategories = {
  getAll: createAsyncThunk(
    "categories/getAll",
    async () => await categoriesApi.getAll()
  ),
};

const actionsCategories = {
  getAll: {
    [fetCategories.getAll.pending]: (state) => {
      state.loading = true;
    },
    [fetCategories.getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [fetCategories.getAll.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
};

export default actionsCategories;
