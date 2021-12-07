import { initState } from './AuthContext'
import { ACTIONS_TYPES } from '../../constants'
export interface Actions {
    type: ACTIONS_TYPES
    payload: string | null
}
const AuthReducer = (state: typeof initState, action: Actions) => {
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

export default AuthReducer
