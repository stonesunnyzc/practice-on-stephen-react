import React from "react";
import { connect } from "react-redux";
//代替<a>标签的一个react-router-dom的feature
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

//把它换成class-based component是因为想使用componentDidMount方法来加载一些东西（一次）
// const StreamList = () => {
//   return <div>StreamList</div>;
// };
class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  //单独封装一个函数用来判断是否需要显示edit／delete 按钮，以减轻renderList的复杂度
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  //{this.renderAdmin(stream)}挪到icon和content的前面，semantic ui lib会处理它，并把butttons显示在最右面
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    // currentUserId: 使用这个变量，判断是否null也是可以的
    // isSignedIn: 但是还是更推荐使用这个变量
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

//Object.values 取出对象所有属性的值
//这个过程在数据传入component之前就已经完成
const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
