// import React from 'react';
import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_ERROR,
  CLEAR_RECIPE,
  CLEAR_ERROR,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPES_LS
} from "../actions/types";

// GET the all the users recipes
export const getRecipes = searchParams => async dispatch => {
  try {
    const config = {
      params: {
        search: searchParams
      }
    };

    const res = await axios.get("/api/recipe", config);

    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });

    localStorage.setItem('recipe', JSON.stringify(res.data))
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

export const updateRecipesFromLocalStorage = (savedState)=> async dispatch =>{
  try {
  dispatch({
    type: UPDATE_RECIPES_LS,
    payload:savedState
  });
  
  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
}

// Clear Recipe from State
export const clearRecipe = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_RECIPE
    });
  } catch (err) {
    dispatch({
      type: CLEAR_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

// **** Get an individual RECIPE
export const getRecipeById = (recipeId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/recipe/${recipeId}`);
    // this saves the recipe to local storage - so on edit refresh, it desont need to send another request
    localStorage.setItem('recipe', JSON.stringify(res.data))

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
    });

    // history.push("/recipe");
  }
};

// create Recipe

export const createRecipe = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/recipe", formData, config);

    dispatch({
      type: CREATE_RECIPE,
      payload: res.data
    });

    dispatch(setAlert("Recipe Created", "RecipeEditSuccess"));

    dispatch({
      type: CLEAR_RECIPE,
      payload: res.data
    });

    history.push(`/recipe/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "LoginDanger")));
    }

    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "create profile error ", status: "server error" }
    });
  }
};

export const editRecipePut = (
  formData,
  history,
  recipeId
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/recipe/${recipeId}`, formData, config);

    dispatch({
      type: EDIT_RECIPE,
      payload: res.data
    });

    dispatch(setAlert("Recipe Sucessfully Edited", "RecipeEditSuccess"));

    history.push(`/recipe/${recipeId}`);
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, error.errorType)));
    }

    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "create profile error ", status: "server error" }
    });
  }
};

// Delete A Recipe

export const deleteRecipe = (history, recipeId) => async dispatch => {
  try {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let data = {recipeToDelete: recipeId}
    await axios.delete(`/api/recipe/${recipeId}`);
    await axios.put("/api/cookbook/deleteRecipe/deleteRecipe", data, config)

    dispatch({
      type: DELETE_RECIPE
    });

    dispatch(setAlert("Recipe Sucessfully Deleted", "RecipeEditSuccess"));

    history.push(`/recipe`);
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "create profile error ", status: "server error" }
    });
  }
};
