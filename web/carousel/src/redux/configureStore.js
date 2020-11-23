import { createStore, combineReducers } from "redux";
import authReducer from './auth/reducer'

const reducers = combineReducers({
    auth: authReducer,
})

function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
    )

    return store;
}

const store = configureStore();

export default store;