interface CommentItemProps {
  userId: string;
  commentUserId: string;
  commentUserEmail: string;
  content: string;
}

const CommentItem = ({ userId, commentUserId, commentUserEmail, content }: CommentItemProps) => {
  return (
    <div className="flex w-full flex-col gap-4 py-2">
      <div className="flex flex-col gap-4 px-2">
        <div className="flex justify-between">
          <span className="text-xl font-medium text-primary-500">{commentUserEmail}</span>
          {userId === commentUserId && (
            <div className="flex gap-2 text-lg text-primary-400">
              <button>수정</button> |<button>삭제</button>
            </div>
          )}
        </div>
        <div className="text-xl">{content}</div>
      </div>
      <hr className="w-full border-stone-200" />
    </div>
  );
};

export default CommentItem;
