import { useEffect, useMemo, useState } from 'react'

const inView = (options: IntersectionObserverInit, ref: React.MutableRefObject<HTMLElement | null>) => {
    const [visible, setVisible] = useState(false)
    const optionsMemo = useMemo(() => options, [options])
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting)
        }, optionsMemo)
        if (ref.current) observer.observe(ref.current!)
        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [ref, optionsMemo])

    return visible
}

export default inView
