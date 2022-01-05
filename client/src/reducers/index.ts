import { combineReducers } from 'redux'
import channelReducer from './channel'

export default combineReducers({
    channel: channelReducer
})
