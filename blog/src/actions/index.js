import jsonPlaceholder from "../apis/jsonPlaceholder";

import _ from "lodash";

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //正常方法
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //使用lodash的chain方法
  _.chain(getState().posts)
    .map("userId") //上一个函数的结果是这个函数的第一个参数
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); //value函数在这里就相当于是一个执行函数，如果不写，上述一系列函数就不会被执行
};

// export const fetchUser = id => async dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response });
// });
