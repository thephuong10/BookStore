import { createSlice } from "@reduxjs/toolkit";
import { flattenObject } from "../../utils/fun";
import actionsCategories from "../thunks/categoriesThunk";

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    entities: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    ...flattenObject(actionsCategories),
  },
});

export const { actions: categoriesActions } = CategoriesSlice;
const { reducer: categoriesReducer } = CategoriesSlice;

export default categoriesReducer;
