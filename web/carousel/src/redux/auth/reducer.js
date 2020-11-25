import * as $AA from "../actionTypes";

const initialState = {
  isSignedIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case $AA.SIGN_IN:
      return { ...state, isSignedIn: true };
    case $AA.SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
