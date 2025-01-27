interface CommentItemProps {
  userEmail: string;
  commentId: number;
  commentUserEmail: string;
  commentUserName: string;
  content: string;
  handleUpdate: (comment: string, commentId: number) => void;
  handleDelete: (commentId: number) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => void;
  onCancelClick: (commentId: number) => void;
  onConfirmClick: (commentId: number) => void;
  value: string;
  updated: boolean;
}

const CommentItem = ({
  userEmail,
  commentId,
  commentUserEmail,
  commentUserName,
  content,
  handleDelete,
  handleUpdate,
  onCancelClick,
  onChange,
  onConfirmClick,
  value,
  updated,
}: CommentItemProps) => {
  return (
    <div className="flex w-full flex-col gap-4 py-2">
      <div className="flex flex-col gap-4 px-2">
        <div className="flex justify-between">
          <div className="text-xl font-medium text-primary-500">{commentUserName}</div>
          {userEmail === commentUserEmail &&
            (!updated ? (
              <div className="flex gap-2 text-lg text-primary-400">
                <button onClick={() => handleUpdate(content, commentId)}>수정</button>|
                <button onClick={() => handleDelete(commentId)}>삭제</button>
              </div>
            ) : (
              <div className="flex gap-2 text-lg text-primary-400">
                <button onClick={() => onCancelClick(commentId)}>취소</button>|
                <button onClick={() => onConfirmClick(commentId)}>완료</button>
              </div>
            ))}
        </div>
        <textarea
          id="comment"
          disabled={!updated}
          placeholder={content}
          value={value}
          onChange={(e) => onChange(e, commentId)}
          className={`resize-none rounded-lg text-xl text-black outline-none placeholder:text-black focus:border focus:outline-none ${
            userEmail === commentUserEmail && updated ? 'border border-primary-300 p-3' : ''
          }`}
        />
      </div>
      <hr className="w-full border-stone-200" />
    </div>
  );
};

export default CommentItem;
