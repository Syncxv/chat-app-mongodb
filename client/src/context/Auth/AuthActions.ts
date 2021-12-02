import { ACTIONS_TYPES } from '../../constants'

export const LoginStart = () => ({
    type: ACTIONS_TYPES.LOGIN_START
})

export const LoginSuccess = (accessToken: string) => ({
    type: ACTIONS_TYPES.LOGIN_SUCCESS,
    payload: accessToken
})

export const LoginFailure = (accessToken: string) => ({
    type: ACTIONS_TYPES.LOGIN_FAILURE,
    payload: accessToken
})
