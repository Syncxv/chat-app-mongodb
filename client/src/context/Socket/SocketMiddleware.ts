import socketAPI from './SocketClient'

export default function socketMiddleware(socket: socketAPI) {
    // Socket param is the client. We'll show how to set this up later.
    return ({ dispatch, getState }: { dispatch: any; getState: any }) =>
        (next: any) =>
        (action: any) => {
            console.log(action)
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }

            /*
             * Socket middleware usage.
             * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
             * type: always 'socket'
             * types: [REQUEST, SUCCESS, FAILURE]
             */
            const { promise, type, types, ...rest } = action

            if (type !== 'socket' || !promise) {
                // Move on! Not a socket request or a badly formed one.
                return next(action)
            }

            const [REQUEST, SUCCESS, FAILURE] = types
            next({ ...rest, type: REQUEST })

            return promise(socket)
                .then((result: any) => {
                    return next({ ...rest, result, type: SUCCESS })
                })
                .catch((error: any) => {
                    return next({ ...rest, error, type: FAILURE })
                })
        }
}
