import { AnyAction } from '@reduxjs/toolkit'
import { Actiontypes } from '../types'

const initialState = {
    initialized: false
}
export default function (state = initialState, action: AnyAction) {
    switch (action.type) {
        case Actiontypes.START_INITIALIZE:
            return {
                type: 'socket'
            }
        default:
            console.log(state, action)
            return state
    }
}
