import RouteHeader from "@/components/common/routeheader";
import CommentItem from "@/components/today/commentitem";
import InputForm from "@/components/today/inputform";
import OtherAnswerItem from "@/components/today/otheransweritem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtherAnswerDetail = () => {
    // 더미데이터
    const dummyData = {
        id: '1',
        userEmail: 'ssafy509',
        content: 'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
        keywords: [
        {
            title: 'SRP',
            correct: true,
        },
    
        {
            title: 'OCP',
            correct: false,
        },
        {
            title: 'LSP',
            correct: false,
        },
        {
            title: 'ISP',
            correct: false,
        },
        {
            title: 'DIP',
            correct: false,
        },
        ],
        date: '2025.01.14',
        likeCount: 1253,
        commentCount: 14,
        liked: true,
    }

    const dummyUser = {id: '1'};
    const dummyComment = [
        {
            commentUserId: '1',
            commentUserEmail: 'comment509',
            content: '면접 때 도움이 되었습니다. 매우 유용해요ㅎㅎ'
        },
        {
            commentUserId: '2',
            commentUserEmail: 'comment509',
            content: '면접 때 도움이 되었습니다. 매우 유용해요ㅎㅎ'
        },
        {
            commentUserId: '3',
            commentUserEmail: 'comment509',
            content: '면접 때 도움이 되었습니다. 매우 유용해요ㅎㅎ'
        },
    ]

    const navigate = useNavigate();
    const [answer, setAnswer] = useState(dummyData);
    const [value, setValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const onSubmit = () => {
        console.log('제출: ', value)
        setValue('')
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    const onBackClick = () => {
        navigate(-1);
    }

    const handleLikeClick = () => {
        setAnswer({
            ...answer,
            liked: !answer.liked,
            likeCount: answer.liked ? answer.likeCount - 1 : answer.likeCount + 1
        });
    };

    return <div className="py-10 px-20 bg-Main">
        <div className="flex flex-col gap-6 bg-white border-primary-200 rounded-2xl border p-6">
            <RouteHeader prev="다른 사람의 답변 목록" title="답변 상세 보기" onBackClick={onBackClick}/>
            <OtherAnswerItem id={answer.id} userEmail={answer.userEmail} content={answer.content} keywords={answer.keywords} date={answer.date} likeCount={answer.likeCount} commentCount={answer.commentCount} liked={answer.liked} handleLikeClick={handleLikeClick} />
            <InputForm id="answerComment" placeholder="댓글을 입력하세요" value={value} onChange={onChange} onSubmit={onSubmit} onKeyDown={onKeyDown}/>
            <div>
                {dummyComment.map((comment, index) => (
                    <div key={index}>
                        <CommentItem userId={dummyUser.id} commentUserId={comment.commentUserId} commentUserEmail={comment.commentUserEmail} content={comment.content}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
export default OtherAnswerDetail;