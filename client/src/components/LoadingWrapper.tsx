import { NextPage } from 'next'

interface LoadingProps {
    loading: boolean
}

export const LoadingWrapper: NextPage<LoadingProps> = ({ loading }) => {
    return (
        <div
            className={`loading-wrapper loading-${loading}`}
            style={{
                visibility: loading ? 'visible' : 'hidden',
                opacity: loading ? '1' : '0'
            }}
        >
            <span className="loading-text">Loading... or is it</span>
        </div>
    )
}
