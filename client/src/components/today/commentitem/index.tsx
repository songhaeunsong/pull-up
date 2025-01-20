interface CommentItemProps {
    userId: string;
    commentUserId: string;
    commentUserEmail: string;
    content: string;
}

const CommentItem = ({userId, commentUserId, commentUserEmail, content}: CommentItemProps) => {
    return <div className="flex flex-col gap-4 w-full py-2">
        <div className="flex flex-col gap-4 px-2">
            <div className="flex justify-between">
                <span className="text-xl font-medium text-primary-500">{commentUserEmail}</span>
                {
                    userId === commentUserId && <div className="flex gap-2 text-lg text-primary-400">
                        <button>수정</button> |
                        <button>삭제</button>
                    </div>
                }
            </div>
            <div className="text-xl">{content}</div>
        </div>
        <hr className="border-stone-200 w-full" />
    </div>
}   

export default CommentItem;