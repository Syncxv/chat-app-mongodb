import { createSlice } from '@reduxjs/toolkit'
import { NextPage } from 'next'
import React from 'react'

interface ModalsArray {
    modal: NextPage<{ onClick: any }> | React.FC<{ onClick: any }>
    props: any
    id: string
}

export interface ModalStoreState {
    failed: boolean
    initialized: boolean
    modals: ModalsArray[]
}

const initialState: ModalStoreState = {
    failed: false,
    initialized: true,
    modals: []
}
export const modalSlice = createSlice({
    name: 'modalStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        pushModal: (state, actions) => {
            state.modals.push(actions.payload)
        },
        popModal: state => {
            state.modals.pop()
        },
        popModalWithKey: state => {
            // state.modals.pop()
            //LATER
        }
    }
})
export const { pushModal, popModal, popModalWithKey } = modalSlice.actions
export default modalSlice.reducer
