import * as $AA from '../actionTypes';

const initialState = {
    isSignedIn: null,
    googleId: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case $AA.SIGN_IN:
            return { ...state, isSignedIn: true, googleId: action.payload };
        case $AA.SIGN_OUT:
            return { ...state, isSignedIn: false, googleId: null };
        default:
            return state;
    }
};