import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Router } from 'next/router'
import { apiUrl, SOCKET_ACTIONS } from '../constants'
import { socketClient } from '../pages/_app'

import type { AppState, AppThunk } from '../stores/store'
import { FriendType, UserType, UserTypeWithFriends } from '../types'

export interface ErrorType {
    feild: string
    message: string
}
export type SuccessType = ErrorType
export interface UserStoreState {
    failed: boolean
    initialized: boolean
    loginOrRegister: {
        loading: boolean
        failed: boolean
        success: boolean
        error?: ErrorType
    }
    accessToken?: string
    friends: FriendType[]
    users: {
        [key: string]: UserType
    }
    currentUserId: string | null
    success?: SuccessType
    error?: ErrorType
}

const initialState: UserStoreState = {
    failed: false,
    loginOrRegister: {
        loading: false,
        failed: false,
        success: false
    },
    initialized: false,
    users: {},
    friends: [],
    currentUserId: null
}
interface initUserReturnType {
    users: UserType[]
    currentUser: UserType
    friends: FriendType[]
}
export const initalizeUsers = createAsyncThunk(
    'userStore/initalizeUsers',
    async (): Promise<initUserReturnType> => {
        return (await socketClient.emit(SOCKET_ACTIONS.USER_INIT)) as initUserReturnType
    }
)
interface loginUserArgumentsTypes {
    username: string
    password: string
}
export const loginUser = createAsyncThunk(
    'userStore/loginUser',
    async (
        { username, password }: loginUserArgumentsTypes,
        { rejectWithValue }
    ): Promise<{ user: UserType } | unknown> => {
        try {
            const { data, statusText } = await axios.post(`${apiUrl}/users/login`, {
                username,
                password
            })
            return data
        } catch (e: any) {
            const error = e.response.data.error || { feild: 'none', message: 'network error idk man' }
            return rejectWithValue(error) as any
        }
    }
)
interface registerUserArgumentsTypes {
    username: string
    password: string
    email: string
}
export const registerUser = createAsyncThunk(
    'userStore/registerUser',
    async (
        { username, password, email }: registerUserArgumentsTypes,
        { rejectWithValue }
    ): Promise<{ user: UserType } | unknown> => {
        try {
            const { data } = await axios.post<{ user: UserType }>(`${apiUrl}/users/register`, {
                username,
                password,
                email
            })
            return data
        } catch (e: any) {
            const error = e.response.data.error || { feild: 'none', message: 'network error idk man' }
            return rejectWithValue(error) as any
        }
    }
)
export const addFriend = createAsyncThunk(
    'userStore/addFriend',
    async (
        { username }: { username: string },
        { rejectWithValue }
    ): Promise<{ user: UserTypeWithFriends }> => {
        try {
            return (
                await axios.post<{ user: UserTypeWithFriends }>(`${apiUrl}/@me/friends/add`, { username })
            ).data
        } catch (e: any) {
            const error = e.response.data.error || { feild: 'none', message: 'network error idk man' }
            return rejectWithValue(error) as any
        }
    }
)
export const acceptFriend = createAsyncThunk(
    'userStore/acceptFriend',
    async ({ id }: { id: string }, { rejectWithValue }): Promise<{ user: UserTypeWithFriends }> => {
        try {
            return (await axios.put<{ user: UserTypeWithFriends }>(`${apiUrl}/@me/friends/accept/${id}`)).data
        } catch (e: any) {
            const error = e.response.data.error || { feild: 'none', message: 'network error idk man' }
            return rejectWithValue(error) as any
        }
    }
)
export const removeFriend = createAsyncThunk(
    'userStore/removeFriend',
    async ({ id }: { id: string }, { rejectWithValue }): Promise<{ user: UserTypeWithFriends }> => {
        try {
            return (await axios.delete<{ user: UserTypeWithFriends }>(`${apiUrl}/@me/friends/remove/${id}`))
                .data
        } catch (e: any) {
            const error = e.response.data.error || { feild: 'none', message: 'network error idk man' }
            return rejectWithValue(error) as any
        }
    }
)
export const userSlice = createSlice({
    name: 'userStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        clearLoginOrRegisterState: state => {
            state.loginOrRegister = initialState.loginOrRegister
        },
        clearError: state => {
            state.error = undefined
        },
        updateUser: (state, action) => {
            if (state.users[action.payload._id]) {
                state.users[action.payload._id] = action.payload
            }
        },
        updateFriend: (state, action: PayloadAction<{ user: UserType; type: number }>) => {
            if (!state.friends.map(s => s.user._id).includes(action.payload.user._id)) {
                state.friends.push(action.payload)
                return
            }
            // state.friends[action.payload._id] = action.payload
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: builder => {
        builder
            .addCase(initalizeUsers.pending, state => {
                console.log('INITING USERS')
            })
            .addCase(initalizeUsers.fulfilled, (state, action) => {
                action.payload.users.forEach(e => {
                    state.users[e._id] = e
                })
                state.currentUserId = action.payload.currentUser._id
                state.users[action.payload.currentUser._id] = action.payload.currentUser
                state.friends = action.payload.friends
                state.initialized = true
                axios.defaults.headers.common['Authorization'] =
                    state.accessToken || localStorage.getItem('token')!
            })
            .addCase(initalizeUsers.rejected, state => {
                state.failed = true
            })
            .addCase(loginUser.pending, state => {
                console.log('LOGGING THEM IN :O')
                state.loginOrRegister.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                console.log('LOGIN FUFFILED', action, window)
                window.localStorage.setItem('token', action.payload.accessToken)
                state.accessToken = action.payload.accessToken
                state.loginOrRegister.loading = false
                state.loginOrRegister.success = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('ACTION IN REJECTED', action)
                state.loginOrRegister.loading = false
                state.loginOrRegister.failed = true
                state.loginOrRegister.error = action.payload as { feild: string; message: string }
            })
            .addCase(registerUser.pending, state => {
                console.log('REGISTERING THEM IN :O')
                state.loginOrRegister.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action)
                state.loginOrRegister.loading = false
                state.loginOrRegister.success = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log('ACTION IN REJECTED IN REGISTER', action)
                state.loginOrRegister.loading = false
                state.loginOrRegister.failed = true
                state.loginOrRegister.error = action.payload as { feild: string; message: string }
            })
            .addCase(addFriend.pending, state => {
                console.log('ADDING FRIEND')
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                console.log('IN FRIEND FUFFILED', action)
                state.success = { feild: 'add-friend', message: ':D success gang' }
                state.friends = action.payload.user.friends
            })
            .addCase(addFriend.rejected, (state, action) => {
                console.log('ACTION IN REJECTED IN REGISTER', action)
                state.error = action.payload as { feild: string; message: string }
                state.error.feild = 'add-friend'
            })
            .addCase(acceptFriend.pending, state => {
                console.log('ACCEPTING THEM FRIEND')
            })
            .addCase(acceptFriend.fulfilled, (state, action) => {
                console.log('IN FRIEND FUFFILED', action)
                state.success = { feild: 'add-friend', message: ':D success gang' }
                state.friends = action.payload.user.friends
            })
            .addCase(acceptFriend.rejected, (state, action) => {
                console.log('ACTION IN REJECTED IN ACCEPT FRIEND', action)
                state.error = action.payload as { feild: string; message: string }
                state.error.feild = 'add-friend'
            })

            .addCase(removeFriend.pending, () => {
                console.log('REMOVING THE FRIEND')
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                console.log('IN FRIEND REMOVE FUFFILED :D', action)
                state.friends = action.payload.user.friends
            })
            .addCase(removeFriend.rejected, (state, action) => {
                console.log('ACTION IN REJECTED IN REMOVE FRIEND', action)
            })
    }
})
export const {
    clearLoginOrRegisterState,
    clearError,
    updateUser,
    updateFriend: updateFriends
} = userSlice.actions
export const getCurrentUser = (state: AppState): UserType | undefined => {
    return state.userStore.users[state.userStore.currentUserId!]
}
export const getUser = (state: AppState, id: string): UserType | undefined => {
    if (state.userStore.users[id]) return state.userStore.users[id]
}
export default userSlice.reducer
