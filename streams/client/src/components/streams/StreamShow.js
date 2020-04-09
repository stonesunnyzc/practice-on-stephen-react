import React from "react";
import flv from "flv.js"
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {

  constructor(props) {
    super(props)
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  //由于componentDidMount只在第一次render的时候被调用一次，
  //所以我们需要在componentDidUpdate里面也创建一次player以防直接刷新页面的情况
  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    //如果已经创建了player或者stream还没有被初始化 就直接返回
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
