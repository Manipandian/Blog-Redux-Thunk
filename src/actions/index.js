import _ from "lodash";

import jsonPlaceHolder from "../API/jsonPlaceHolder";

//Call both fetch post and user from this action creator(alternative for user memoization)
export const fetchPostAndUsers = () => async (Dispatch, getState) => {
    await Dispatch(fetchPost());
    const userId = _.uniq(_.map(getState().post, "userId"));
    userId.forEach(id => Dispatch(fetchUser(id)));
  
    // //Lodash chain for above methodes
    // _.chain(getState().post)
    //  .map("userId")
    //  .uniq()
    //  .forEach(id => Dispatch(fetchUser(id)))
    //  .value();
}

export const fetchPost = () => {
    return async (Dispatch, getState) => {
        const response = await jsonPlaceHolder.get("/posts");
        Dispatch({type: "FETCH_POST", payload: response.data})
    }
}

export const fetchUser = (id) => async (Dispatch, getState) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    Dispatch({type: "FETCH_USER", payload: response.data})
}

// //Action creator with memoization using lodash to avoid unwanted request
// export const fetchUser = (id) => async (Dispatch) => _memoizeFetchUser(id, Dispatch);
// const _memoizeFetchUser = _.memoize(async (id, Dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     Dispatch({type: "FETCH_USER", payload: response.data})
// })