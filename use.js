import {use} from 'react';


//Promise 사용 예시
function Comments ({commentsPromise}) {
    const comments = use(commentsPromise);
    return comments.map(comment => <p key={comment.id}>{comment.text}</p>)
}
//위의 예시는 use는 commentsPromise가 해결될때까지는 컴포넌트를 기다리면 Suspend시키며,
//Promise가 해결되면 comments를 렌더링합니다.

//Context 사용
function ThemedButton({show}){
    if(show){
        const theme = use(ThemedContext);
        return <button className={theme}>Click me</button>;
    }
    return null;
} // use 는 ThemeContext의 값을 읽어와 버튼의 테마를 설정합니다.
//조건문 내에서도 use를 호출 할 수 있어 코드 구조가 더욱 간결해집니다.


import {use, Suspense} from 'react';

function fetchUser(){
    return fetch("http://randomuser.me/api/")
    .then(response => response.json())
    .then(data => data.result[0])
}
//API 요청 결과를 저장
const userPromise = fetchUser();
//USE를 활용한 데이터 가져오기
function UserProfile() {
    const user = use(userPromise);
    return (
        <div>
            <h2>{user.name.first} {user.name.last}</h2>
            <img src = {user.picture.large}/>
        </div>
    )
}
//App 컴포넌트: Suspense를 활용한 로딩 처리
export default function App() {
    return (
        <Suspense fallback={<p>Loading user...</p>}>
            <UserProfile/>
        </Suspense>
    )
}

//use의 context
import { createContext,use } from 'react';

const ThemeContext = createContext('light');
function ThemeButton(){
    const theme = use(ThemeContext); //useContext 대신 use사용
    return <button className={theme}>clicke me</button>
}
export default function App(){
    return (
        <ThemeContext.Provider value = 'dark'>
            <ThemeButton/>
        </ThemeContext.Provider>
    )
}

import { useActionState } from 'react';

async function updateNameOnServer(name){
//서버에서 이름을 업데이트 하는 비동기 함수
	await new Promise((resolve)=> setTimeout(resolve,2000)) //2초 대기
   	return name;
}

function UpdateNameForm(){
	const [ name, updateNameAction, isPending ] = useActionState(
    	async (previousName, formData) => {
        	const newName = forData.get('name');
            const updateName = await updateNameOnServer(newName);
            return updateName;
            },
            ''
);

    return (
        <form action={updateNameAction}>
            <label>
                이름:
                <input name='name' defaultValue={name}/>
            </label>
            <button type='submit' disabled={isPending}>
                {isPending ? '업데이트중' : '업데이트'}
            </button>
            {name && <p>현재 이름: {name}</p>}
        </form>
   )
}

import { useFormStatus } from 'react-dom';
function SubmitButton(){
    const {pending} = useFormStatus();

    return (
        <button type='submit' disabled={pending}>
            {pending ? 'submitting...' : 'submit'}
        </button>
    );
}
function FormStatus() {
    const { pending, data } = useFormStatus();

    return (
        <div>
            {pending && data ? (
                <p>submitting: {data.get('username')}</p>
            ):(
                <p>form is idle.</p>
            )}
        </div>
    )
}
export default function App(){
    const handleSubmit = async(formData) => {
        //폼데이터 처리 로직
        await new Promise((resolve)=>setTimeout(resolve,2000));
    }
    return (
        <form action={handleSubmit}>
            <input type='text' name='username'/>
            <SubmitButton/>
            <FormStatus/>
        </form>
    )
}