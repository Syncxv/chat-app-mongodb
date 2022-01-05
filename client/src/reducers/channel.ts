import { AnyAction } from '@reduxjs/toolkit'
import { Actiontypes } from '../types'

const initialState = 0
export default function (state = initialState, action: AnyAction) {
    switch (action.type) {
        case Actiontypes.TEST_1:
            return state++
        default:
            console.log(state, action)
            return state
    }
}
