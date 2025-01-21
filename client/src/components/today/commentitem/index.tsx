interface CommentItemProps {
  userId: string;
  commentUserId: string;
  commentUserEmail: string;
  content: string;
  handleUpdate: (comment: { id: string; email: string; content: string }) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancelClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirmClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  updated: boolean;
}

const CommentItem = ({
  userId,
  commentUserId,
  commentUserEmail,
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
          <div className="text-xl font-medium text-primary-500">{commentUserEmail}</div>
          {userId === commentUserId &&
            (!updated ? (
              <div className="flex gap-2 text-lg text-primary-400">
                <button
                  onClick={() =>
                    handleUpdate({
                      id: commentUserId,
                      email: commentUserEmail,
                      content: content,
                    })
                  }
                >
                  수정
                </button>
                |<button onClick={handleDelete}>삭제</button>
              </div>
            ) : (
              <div className="flex gap-2 text-lg text-primary-400">
                <button onClick={onCancelClick}>취소</button>|<button onClick={onConfirmClick}>완료</button>
              </div>
            ))}
        </div>
        <textarea
          id="comment"
          disabled={!updated}
          placeholder={content}
          value={value}
          onChange={onChange}
          className={`resize-none rounded-lg text-xl text-black outline-none placeholder:text-black focus:border focus:outline-none ${
            !updated ? '' : 'border border-primary-300 p-3'
          }`}
        />
      </div>
      <hr className="w-full border-stone-200" />
    </div>
  );
};

export default CommentItem;
