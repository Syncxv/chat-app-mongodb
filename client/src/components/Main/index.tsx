import { bindActionCreators } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { apiUrl, SOCKET_ACTIONS } from '../../constants'
import { socketClient } from '../../pages/_app'
import message, {
    FetchingType,
    fetchMessages,
    initalizeMessagesForChannel,
    messageCreate,
    receiveMessage
} from '../../reducers/message'
import { AppDispatch, AppState } from '../../stores/store'
import { MessageType } from '../../types'
import Message from '../Message'
import MessagePlaceholder from '../MessagePlaceholder'
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
    messages: state.messageStore.channelMessages[ownProps.params?.cid || ''],
    channel: state.channelStore.channels[ownProps.params?.cid || ''],
    hasMore: state.messageStore.hasMore
})
const mapDispatchToProps = (dispatch: AppDispatch) =>
    bindActionCreators(
        {
            fetchMessages,
            initalizeMessagesForChannel,
            messageCreate,
            receiveMessage
        },
        dispatch
    )
class MainClass extends React.Component<Props, { initalized: boolean }> {
    ref: React.RefObject<HTMLDivElement>
    placeholderRef: React.RefObject<HTMLDivElement>
    messageListRef: React.RefObject<HTMLUListElement>
    textAreaRef: React.RefObject<HTMLInputElement>
    inited: React.RefObject<boolean>
    resizeObserver: ResizeObserver
    intersectionObserver: IntersectionObserver
    constructor(props: Props) {
        super(props)
        this.state = {
            initalized: false
        }
        this.props.initalizeMessagesForChannel()
        this.ref = React.createRef()
        this.messageListRef = React.createRef()
        this.placeholderRef = React.createRef()
        this.textAreaRef = React.createRef()
        this.inited = React.createRef()
        this.resizeObserver = new ResizeObserver(this.handleResize.bind(this))
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0
        })
        this.getScrollState = this.getScrollState.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.props.fetchMessages({ channel_id: this.props.params?.cid })
    }
    componentDidMount() {
        console.log('MOUNTED', this.ref)
        this.resizeObserver.observe(this.messageListRef.current!)
        if (this.placeholderRef.current) {
            this.intersectionObserver.observe(this.placeholderRef.current)
        }
        socketClient.on(SOCKET_ACTIONS.RECIVE_MESSAGE, (message: MessageType) => {
            this.props.receiveMessage({ message, channel_id: this.props.params.cid })
            //it aint stupid if it works
            this.messageListRef.current?.lastElementChild?.scrollIntoView()
        })
    }
    componentWillUnmount() {
        this.resizeObserver.disconnect()
        socketClient.off(SOCKET_ACTIONS.RECIVE_MESSAGE)
    }
    render() {
        const {
            fetching: { loading, finishedFetching },
            messages,
            hasMore
        } = this.props
        console.log(messages, console.log(this.props.params))
        return (
            <AppWrapper>
                <div ref={this.ref} onScroll={this.handleScroll} className="main-seciton">
                    <ul ref={this.messageListRef} className="messages-list">
                        <div ref={this.placeholderRef} className="placeholder-wrapper">
                            {hasMore && (
                                <div className="placeholder-wrapper-iguess-idk-man">
                                    {Array.from(Array(10)).map(() => (
                                        <MessagePlaceholder />
                                    ))}
                                </div>
                            )}
                        </div>
                        {finishedFetching
                            ? this.props?.messages?.map(message => (
                                  <Message key={message._id} message={message} />
                              ))
                            : 'aw'}
                    </ul>
                    <form onSubmit={this.handleSubmit} className="form-wrapper">
                        <input
                            ref={this.textAreaRef}
                            className="text-area"
                            type="text"
                            placeholder={`Message ${this.props.channel.members[0].username}`}
                        />
                    </form>
                </div>
            </AppWrapper>
        )
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (this.textAreaRef.current?.value) {
            this.props.messageCreate({
                content: this.textAreaRef.current.value,
                channel_id: this.props.params.cid
            })
            this.textAreaRef.current.value = ''
        }
    }
    handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        // console.log(this.getScrollState())
    }

    handleIntersection([entry]: IntersectionObserverEntry[]) {
        setTimeout(() => {
            console.log(this.state, this.props)
            const scrollState = this.getScrollState()
            const heightTakeAwayOffesetHeight = scrollState.scrollHeight - scrollState.offsetHeight
            console.log(
                'heightTakeAwayOffesetHeight:',
                heightTakeAwayOffesetHeight,
                'scrollTop',
                scrollState.scrollTop
            )

            if (
                !this.props.fetching.loading &&
                this.state.initalized &&
                entry.isIntersecting &&
                !(heightTakeAwayOffesetHeight === scrollState.scrollTop) &&
                this.props.hasMore
            ) {
                //CAN FETCH MESSAGES :D HOLY SHIT
                console.log(entry, this.getScrollState())
                this.props.fetchMessages({
                    channel_id: this.props.params.cid,
                    before: this.props.messages[0]._id
                })
            }
        }, 100)
    }

    handleResize(e: ResizeObserverEntry[]) {
        console.log(e, e[0].target.childElementCount)
        const scrollState = this.getScrollState()
        if (scrollState?.scrollTop === 0 && this.props.hasMore) {
            this.ref.current?.scrollTo(0, Number.MAX_SAFE_INTEGER)
            this.setState({ initalized: true })
        }
    }
    getScrollState(elem?: HTMLDivElement) {
        if (!elem) {
            const div = this.ref.current!
            return {
                scrollTop: div.scrollTop,
                scrollLeft: div.scrollLeft,
                scrollHeight: div.scrollHeight,
                scrollWidth: div.scrollWidth,
                offsetHeight: div.offsetHeight,
                offsetWidth: div.offsetWidth,
                clientHeight: div.clientHeight,
                offsetTop: div.offsetTop
            }
        }
        return {
            scrollTop: elem.scrollTop,
            scrollLeft: elem.scrollLeft,
            scrollHeight: elem.scrollHeight,
            scrollWidth: elem.scrollWidth,
            offsetHeight: elem.offsetHeight,
            offsetWidth: elem.offsetWidth,
            clientHeight: elem.clientHeight,
            offsetTop: elem.offsetTop
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainClass)
// export default /*  React.memo(Main) */ MainClass
