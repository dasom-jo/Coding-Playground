import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
//react-router
const App = () => {
    return (
        <Route> {/* 라우팅을 감싸는 컨테이너 */}
            <Routes> {/*  여러개의 라우터를 감싸는 컴포넌트 */}
                <Route path='/' element={<Home/>} />
                <Route path='/' element={<About/>} />
            </Routes>
        </Route>
     );
}

export default App;

//동적 라우팅
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
    const {id} = useParams(); //url에서 id값을 가져옴
    return <h1>사용자 아이디 : {id}</h1>;
}
//라우터 설정
<Route path = "/user/:id" element={<UserProfile/>}/>

//navigation
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
    <button onClick={()=>navigate('/about')}>
        about 페이지로 이동
    </button>
    );
}

//라우트 보호
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({isAuth, children}) => {
    return isAuth ? children : <Navigate to='login'/>
}
//사용예시
<Route path="/dashboard" element={<ProtectedRoute isAuth={userLoggedIn}></ProtectedRoute>} />

//파일 기반 라우팅
//라우팅 설정 없이 자동으로 동작
//pages/about.tsx
export const About = () => {
    return <h1>about 페이지</h1>
}

//동적 라우팅
export const UserProfile2 = () => {
    const router = useRouter();
    const {id} = router.query;
    return <h1>사용자 id : {id}</h1>
}