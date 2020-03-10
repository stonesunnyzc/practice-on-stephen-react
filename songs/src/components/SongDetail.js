import React from "react";
import { connect } from "react-redux";
import { selectSong } from "../actions";

const SongDetail = props => {
  if (!!props.song) {
    return (
      <div>
        <div>title:{props.song.title}</div>
        <div>Duration:{props.song.duration}</div>
      </div>
    );
  } else {
    return <div>Select a song</div>;
  }
};

const mapStateToProp = state => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProp, { selectSong })(SongDetail);
