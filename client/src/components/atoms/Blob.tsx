import React from 'react'

interface Props {
    width: number | string
    opacity: number | string
}

const Blob: React.FC<Props> = ({ width, opacity }) => {
    return (
        <>
            <div
                style={{ width: `${width}rem`, opacity }}
                className="p-blob h-4 leading-5 bg-text-normal rounded-3xl mt-2"
            ></div>
        </>
    )
}

export default Blob
