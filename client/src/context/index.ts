// import { HYDRATE, createWrapper } from "next-redux-wrapper"
// import { applyMiddleware, combineReducers, AnyAction, createStore } from "redux"
// import { Context } from "next-redux-wrapper"
// import thunkMiddleware from 'redux-thunk'
// import AuthReducer from "./Auth/AuthReducer"

// const bindMiddleware = (middleware: any) => {
//     if (process.env.NODE_ENV !== 'production') {
//         const { composeWithDevTools } = require('redux-devtools-extension')
//         return composeWithDevTools(applyMiddleware(...middleware))
//     }
//     return applyMiddleware(...middleware)
// }

// const combinedReducer = combineReducers({
//     AuthReducer
// })
// const reducer = (state: any, action: AnyAction) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload // apply delta from hydration
//         }
//         if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
//         return nextState
//     } else {
//         return combinedReducer(state, action)
//     }
// }
// const initStore = () => {
//     return createStore(reducer, bindMiddleware([thunkMiddleware]))
// }
// export const makeStore = (context: Context) => {
//     const store = createStore(AuthReducer)
//     return store
// }
// // export const wrapper = createWrapper<Store<initStateType>>(makeStore, { debug: true })
// export const wrapper = createWrapper(initStore)
export const bruh = ''
