import { NextPage } from 'next'
import React from 'react'

interface Props {
    size: number
}

const Plus: NextPage<Props> = ({ size }) => {
    return (
        <div
            style={{ height: `${size}px`, width: `${size}px` }}
            className="plus cursor-pointer flex justify-center"
        >
            <div className="bar1 bg-white h-full w-[1px]"></div>
            <div className="bar2 bg-white h-full w-[1px] rotate-90 translate-x-[-1px]"></div>
        </div>
    )
}

export default Plus
