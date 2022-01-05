import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import socketMiddleware from '../context/Socket/SocketMiddleware'
import { Socket } from 'socket.io-client'
const initialState = {}

export default function configureStore(initialState: any, socketClient: any) {
    // const middleware = [
    //   socketMiddleware(socketClient as Socket),
    // ];
    const store = createStore(rootReducer, initialState, applyMiddleware(socketMiddleware(socketClient)))
    return store
}
