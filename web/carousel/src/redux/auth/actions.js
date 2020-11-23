import { SIGN_IN, SIGN_OUT } from "../actionTypes"

export const signIn = (googleId) => {
    return {
        type: SIGN_IN,
        payload: googleId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}