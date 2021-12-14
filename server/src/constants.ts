export const COOKIE_NAME = 'token'
export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || ['http://localhost:3000'].indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
