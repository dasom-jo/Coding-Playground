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

//React Router 내부적으로 동작하는 코드
window.addEventListener("popstate", ()=>{
    console.log ('url이 변경되었습니다.', window.location.pathname);
    renderComponentForRoute(window.location.pathname);
});

//hashrouter
window.addEventListener("hashchange", ()=>{
    console.log('해시변경감지', window.location.hash);
    renderComponentForRoute(window.location.hash)
})

//Routing 기본 원리
const routes =[
    {path:'/', component: Home},
    {path:'/about', component: About},
]

const renderComponentForRoute = (path) => {
    const match = routes.find((route) => route.path === path);
    if (math) {
        render(math.component);
    }else{
        render(NotFound)
    }
};

//routes와 route의 내부 동작
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
</Routes>
const match = routes.find((route)=> route.path === window.location.pathname);
if(match){
    render(match.element);
}else {
    render(NotFound);
}

//동적 라우팅의 원리
<Route path="/user/:id" element={<UserProfile />} />
const pathPattern = "/user/:id";
const url = "/user/123";
const match2 = url.match(/\/user\/(\d+)/); //정규식을 이용하여 id 추출
if(match2) {
    console.log("유저id:" , match2[1]) //123
}

//라우팅이 변경 될 때 상태 초기화 하는 방법
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyComponent = () => {
    const location = useLocation();

    useEffect(()=>{
        console.log('라우팅 변경 감지:', location.pathname);
        //상태 초기화
    },[location]);
    return <div>현재 페이지:{location.pathname}</div>
}