import { initState, initStateType } from './AuthContext'
import { ACTIONS_TYPES } from '../../constants'
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'
export interface Actions {
    type: ACTIONS_TYPES
    payload: string | null
}
const AuthReducer = (
    state: initStateType = { accessToken: null, error: false, isFetching: true },
    action: AnyAction
) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                accessToken: null,
                isFetching: true,
                error: false
            }
        case 'LOGIN_SUCCESS':
            return {
                accessToken: action.payload,
                isFetching: false,
                error: false
            }
        case 'LOGIN_FAILURE':
            return {
                accessToken: null,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    AuthReducer
})
const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        }
        if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}
const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
}
export const makeStore = (context: Context) => {
    const store = createStore(AuthReducer)
    return store
}
// export const wrapper = createWrapper<Store<initStateType>>(makeStore, { debug: true })
export const wrapper = createWrapper(initStore)
export default AuthReducer
