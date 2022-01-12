import { bindActionCreators } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { apiUrl } from '../../constants'
import { FetchingType, fetchMessages } from '../../reducers/message'
import { AppDispatch, AppState } from '../../stores/store'
import { MessageType } from '../../types'
import Message from '../Message'
import AppWrapper from '../Wrapper'
interface InitalChannelProps {
    params?: {
        cid: string
    }
}
type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        params: {
            cid: string
        }
    }

const mapStateToProps = (state: AppState, ownProps: InitalChannelProps) => ({
    fetching: state.messageStore.fetching,
    messages: state.messageStore.channelMessages[ownProps.params?.cid || '']
})
const mapDispatchToProps = (dispatch: AppDispatch) =>
    bindActionCreators(
        {
            fetchMessages
        },
        dispatch
    )
class MainClass extends React.Component<Props> {
    ref: React.RefObject<HTMLDivElement>
    constructor(props: Props) {
        super(props)
        this.ref = React.createRef()
        this.getScrollState = this.getScrollState.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.props.fetchMessages({ channel_id: this.props.params?.cid })
    }
    componentDidMount() {
        console.log('MOUNTED')
    }

    render() {
        const {
            fetching: { loading, finishedFetching },
            messages
        } = this.props
        return (
            <AppWrapper>
                <div ref={this.ref} onScroll={this.handleScroll} className="main-seciton">
                    <ul className="messages-list">
                        {finishedFetching ? messages.map(message => <Message message={message} />) : 'aw'}
                    </ul>
                </div>
            </AppWrapper>
        )
    }

    handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        console.log(e)
        console.log(this.getScrollState())
    }

    getScrollState() {
        const div = this.ref.current
        if (div) {
            return {
                scrollTop: div.scrollTop,
                scrollLeft: div.scrollLeft,
                scrollHeight: div.scrollHeight,
                scrollWidth: div.scrollWidth,
                offsetHeight: div.offsetHeight,
                offsetWidth: div.offsetWidth
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainClass)
// export default /*  React.memo(Main) */ MainClass
