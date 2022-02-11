import { NextPage } from 'next'
import React from 'react'
import { pushModal } from '../reducers/modal'
import store from '../stores/store'
export const open = (modal: NextPage<any> | React.FC, props?: any) => {
    const id = (Date.now() + ~~Math.random()).toString()
    store.dispatch(pushModal({ modal, id, props }))
}
