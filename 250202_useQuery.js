import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
};

const MyComponent = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchData,
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