import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SOCKET_ACTIONS } from '../constants'
import { socketClient } from '../pages/_app'

import type { AppState, AppThunk } from '../stores/store'
import { RawChannel } from '../types'

export interface ChannelStoreState {
    failed: boolean
    initialized: boolean
    channels: {
        [key: string]: RawChannel
    }
}

const initialState: ChannelStoreState = {
    failed: false,
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
export const channelSlice = createSlice({
    name: 'channelStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
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
    }
})
export const getChannel = (id: string, state: AppState): RawChannel | undefined => {
    return state.channelStore.channels[id]
}
export default channelSlice.reducer