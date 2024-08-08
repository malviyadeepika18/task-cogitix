import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  episodeData: [],
  characterData:[],
  EpiData:[],
};

const slice = createSlice({
  name: "epi",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getEpisodeSuccess(state, action) {
      state.isLoading = false;
      state.episodeData = action.payload;
    },

    getcharacterSuccess(state, action) {
      state.isLoading = false;
      state.characterData = action.payload;
    },

    getEpisuccess(state, action) {
      state.isLoading = false;
      state.EpiData = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEpisode() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("https://rickandmortyapi.com/api/episode");
      dispatch(slice.actions.getEpisodeSuccess(response.data.results));
      console.log("response",response.data)
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getCharacters() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("https://rickandmortyapi.com/api/character");
      dispatch(slice.actions.getcharacterSuccess(response.data.results));
      console.log("responsecharachhter",response.data)
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}









export function getEpis(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
     

      const characterUrls = response.data.characters;
     

    
      const characterPromises = characterUrls.map((url) => axios.get(url));
      const characterResponses = await Promise.all(characterPromises);

      
      const characters = characterResponses.map((res) => res.data);
      

      dispatch(slice.actions.getcharacterSuccess(characters)); 
    } catch (error) {
     
      dispatch(slice.actions.hasError(error));
    }
  };
}
