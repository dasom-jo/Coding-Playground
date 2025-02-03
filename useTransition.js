import { useState, useTransition } from 'react';
//useTransition : 비동기 처리에 우선 순위 주기
function MyComponent () {
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState(null);

    const handleClick = () => {
        startTransition(async() => {
            const result = await fetchData();
            setData(result);
        })
    };
    return(
        <div>
            <button onClick={handleClick}>데이터 가져오기</button>
            {isPending ? <p>로딩중....</p>:<p>{data}</p>}
        </div>
    )
}
//useTransition : ui 우선 순위 처리
const Transition = () => {
    const [fast, setFast] = useState("");
    const [slow, setSlow] = useState("");
    const [isPending, startTransition] = useTransition();

    const update = () => {
        setFast("긴급");

        startTransition(()=>{
            setSlow('여유')
        });
    };

    return (
        <div>
            <h1>{fast}</h1>
            {isPending ? <p>loading...</p>:<h2>{slow}</h2>}
            <button onClick={update}>업데이트 하기</button>
        </div>
    )
}
