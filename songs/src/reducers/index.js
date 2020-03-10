import { combineReducers } from "redux";

const songsReducer = () => {
  return [
    {
      title: "Seasons in the sun",
      duration: "4:05"
    },
    {
      title: "On the top of the world",
      duration: "2:30"
    },
    {
      title: "My heart will go on",
      duration: "2:10"
    },
    {
      title: "Rainy days and Mondays",
      duration: "3:10"
    }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
