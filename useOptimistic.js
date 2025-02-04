const [optimisticState, setOptimisticState] = useOptimisticState(realState, (prevState,action) => {
    return action;
    }
)

//useOptimistic 예제 코드 (좋아요 버튼)
import { useOptimistic, useState } from "react";

export default function OptimisticLikeButton() {
    const [likes, setLikes] = useState(100); // 서버에서 가져온 실제 좋아요 개수
    const [optimisticLikes,addOptimisticLike] = useOptimistic(likes, (currentLikes)=> currentLikes + 1);

    const handleLike = async () => {
        addOptimisticLike(); //낙관적  ui업데이트

        try {
            await fetch("/api/like", {method:"POST"}); //서버 요청 (실제 업데이트)
            setLikes((prev)=>prev + 1); //실제서버에 업데이트
        }catch (error){
            console.error("좋아요 실패",error);
            //실패시 롤백 가능
        }
    };
    return (
        <div>
          <button onClick={handleLike}>
            👍 좋아요 ({optimisticLikes}) {/* 🔥 즉시 UI 반영 */}
          </button>
        </div>
      );
}