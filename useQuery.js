import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
};
//usequery 기본 구조
const MyComponent = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchData,
        staleTime : 1000 * 60 * 5, //5분 동안 fresh 상태 유지
        cacheTime : 1000 * 60 *10 // 10분 후 캐시 삭제
    })

    if (isLoading) return <p>lading.....</p>;
    if (error) return <p>error : {error.message}</p>

    return (
        <div>
            {data.map((post)=>(
            <p key={post.id}>{post.title}</p>
        ))}
        </div>
    )
}

//쿼리변수 활용
const fetchUser = async (userId) => {
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return data;
};

const UserProfile = ({userId}) => {
    const {data, isLoading} = useQuery({
        queryKey : ["user", userId], //userId마다 다른 데이터를 캐싱
        queryFn: () => fetchUser(userId)
    });

    if(isLoading) return <p>loading....</p>

    return <p>{data.name}</p>
}

//useEffect + useState 방식
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=>{
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/data');
            setData(response.data);
        }catch(err){
            setError(err);
        }finally{
            setIsLoading(false)
        }
    };
    fetchData;
},[])

//내부적으로 usequery가 하는 동작을 코드로 표현
const useQuery = ({queryKey, queryFn, Options}) => {
    const [state, setState] = useState({
        data : null,
        error : null,
        isLoading : true,
    });

    useEffect(()=>{
        let isMounted = true;

        const fetchData = async () => {
            try {
                const cachedData = queryClient.getCache(queryKey); // 캐싱된 데이터가 있는지 확인
                if(cachedData){ //데이터가 있으면
                    setState({data: cachedData, error: null, isLoading:false});
                }else {
                    const data = await queryFn(); //데이터 없으면
                    queryClient.setCache(queryKey, data);
                    if(isMounted){
                        setState({data, error : null, isLoading:false})
                    }
                }
            }catch (error) {
                if(isMounted){
                    setState({data:null, error , isLoading : false})
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false; //언마운트 된 경우 상태 업데이트 방지
        };
    }, [queryKey,queryFn]);
    return state;
}