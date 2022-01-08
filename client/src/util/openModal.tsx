import { NextPage } from 'next'
import ReactDOM from 'react-dom'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import useModal from '../hooks/useModal'
import { pushModal } from '../reducers/modal'
import store from '../stores/store'
export const open = (modal: NextPage<any> | React.FC, props?: any) => {
    const id = (Date.now() + ~~Math.random()).toString()
    store.dispatch(pushModal({ modal, id, props }))
}
