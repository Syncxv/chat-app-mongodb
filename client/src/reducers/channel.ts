import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl, SOCKET_ACTIONS } from '../constants'
import { socketClient } from '../pages/_app'

import type { AppState, AppThunk } from '../stores/store'
import { RawChannel } from '../types'

export interface ChannelStoreState {
    failed: boolean
    currentChanel: undefined | string
    initialized: boolean
    channels: {
        [key: string]: RawChannel
    }
}

const initialState: ChannelStoreState = {
    failed: false,
    currentChanel: undefined,
    initialized: false,
    channels: {}
}
interface initChannelReturnType {
    channels: RawChannel[]
}
export const initalizeChannels = createAsyncThunk(
    'channelStore/initalizeChannels',
    async (): Promise<initChannelReturnType> => {
        return (await socketClient.emit(SOCKET_ACTIONS.CHANNEL_INIT)) as initChannelReturnType
    }
)
export const addChannel = createAsyncThunk(
    'channelStore/addChannel',
    async (user_id: string): Promise<{ channel: RawChannel }> => {
        const { data } = await axios.post(`${apiUrl}/@me/channels`, {
            members: [user_id]
        })
        return { channel: data }
    }
)
export const channelSlice = createSlice({
    name: 'channelStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCurrentChannel: (state, action) => {
            state.currentChanel = action.payload
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: builder => {
        builder
            .addCase(initalizeChannels.pending, state => {
                console.log('INITING CHANNELS')
            })
            .addCase(initalizeChannels.fulfilled, (state, action) => {
                action.payload.channels.forEach(channel => (state.channels[channel._id] = channel))
                state.initialized = true
            })
            .addCase(initalizeChannels.rejected, state => {
                state.failed = true
            })
            .addCase(addChannel.pending, state => {
                console.log('ADDING CHANNEL')
            })
            .addCase(addChannel.fulfilled, (state, action) => {
                state.channels[action.payload.channel._id] = action.payload.channel
            })
    }
})
export const { setCurrentChannel } = channelSlice.actions

export const getChannel = (id: string, state: AppState): RawChannel | undefined => {
    return state.channelStore.channels[id]
}
export default channelSlice.reducer
