import { Params, RouteMatch } from 'react-router'

interface Props {
    match: Readonly<Params<string>>
}

const MainChat: React.FC<Props> = ({ match }) => {
    return <div></div>
}

export default MainChat
