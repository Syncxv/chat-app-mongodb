import { useRef, useEffect } from 'react'

export const AlwaysScrollToBottom = () => {
    const textAreaRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => textAreaRef?.current?.scrollIntoView())
    return <div ref={textAreaRef} />
}
