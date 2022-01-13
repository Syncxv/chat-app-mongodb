import { NextPage } from 'next'
import React from 'react'
import { randomNumberBetweenDecimalToo } from '../util/randomNumberBetweenDecimalToo'
import Blob from './atoms/Blob'
const CONTENT_BLOB_WITH_OFFSET_MIN = 2
const CONTENT_BLOB_WITH_OFFSET_MAX = 5
interface Props {}

const MessagePlaceholder: NextPage<Props> = () => {
    return (
        <div className="messages-wrapper">
            <div className="placeholder-message">
                <div
                    style={{ opacity: '0.4', marginTop: '0.3rem' }}
                    className="p-avatar h-8 w-8 bg-text-normal rounded-full"
                ></div>
                <div className="p-contents flex flex-col">
                    <div className="p-header flex items-center h-5">
                        <Blob
                            opacity={randomNumberBetweenDecimalToo(0.6, 0.8)}
                            width={randomNumberBetweenDecimalToo(5, 8)}
                        />
                    </div>
                    {/* //love these people fuck https://stackoverflow.com/questions/50898165/react-render-a-certain-number-of-components-dynamically */}
                    {Array.from(Array(parseInt(randomNumberBetweenDecimalToo(3, 5)))).map((_, i) => (
                        <div key={i} className="line-1 flex gap-1">
                            {Array.from(Array(parseInt(randomNumberBetweenDecimalToo(4, 7)))).map((_, i) => (
                                <Blob
                                    key={i}
                                    opacity={randomNumberBetweenDecimalToo(0.3, 0.4)}
                                    width={randomNumberBetweenDecimalToo(
                                        CONTENT_BLOB_WITH_OFFSET_MIN,
                                        CONTENT_BLOB_WITH_OFFSET_MAX
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MessagePlaceholder
