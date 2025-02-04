import { Comment } from '@/types/interview';

interface CommentItemProps {
  userEmail: string;
  comment: Comment;
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
  comment,
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
          <div className="text-lg font-medium text-primary-500 md:text-xl">{comment.otherMemberName}</div>
          {userEmail === comment.email &&
            (!updated ? (
              <div className="flex gap-2 text-primary-400 md:text-lg">
                <button onClick={() => handleUpdate(comment.comment, comment.commentId)}>수정</button>|
                <button onClick={() => handleDelete(comment.commentId)}>삭제</button>
              </div>
            ) : (
              <div className="flex gap-2 text-primary-400 md:text-lg">
                <button onClick={() => onCancelClick(comment.commentId)}>취소</button>|
                <button onClick={() => onConfirmClick(comment.commentId)}>완료</button>
              </div>
            ))}
        </div>
        <textarea
          id="comment"
          disabled={!updated}
          placeholder={comment.comment}
          value={value}
          onChange={(e) => onChange(e, comment.commentId)}
          className={`resize-none rounded-lg text-lg text-black outline-none placeholder:text-black focus:border focus:outline-none md:text-xl ${
            userEmail === comment.email && updated ? 'border border-primary-300 p-3' : ''
          }`}
        />
      </div>
      <hr className="w-full border-stone-200" />
    </div>
  );
};

export default CommentItem;
