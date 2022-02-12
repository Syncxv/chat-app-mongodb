import { useRouter } from 'next/router'
import { Wrapper } from './login'
const Home: Wrapper = () => {
    const router = useRouter()
    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <button className="btn" onClick={() => router.push('/login')}>
                    Login
                </button>
            </div>
        </>
    )
}
Home.isNotApp = true
export default Home
