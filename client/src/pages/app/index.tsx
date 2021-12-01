import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { apiUrl } from '../../constants'
import { requestWrapper } from '../../util/reqeust'

const App = () => {
    return (
        <>
            <div className="app-wrapper">
                <Sidebar />
                <Button size={Button.Size.Large} text="hehe" onClick={() => requestWrapper.get(`${apiUrl}/users/@me`)}>
                    Hehe
                </Button>
            </div>
        </>
    )
}

export default App
