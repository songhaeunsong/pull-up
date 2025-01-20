import RouteHeader from "@/components/common/routeheader";
import OtherAnswerItem from "@/components/today/otheransweritem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtherAnswerList = () => {
    // 더미데이터
    const dummyData = [
        {
            id: '1',
            userEmail: 'ssafy509',
            content: 'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
            date: '2025.01.14',
            likeCount: 1253,
            commentCount: 14,
            liked: true,
        },
        {
            id: '2',
            userEmail: 'ssafy509',
            content: 'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
            date: '2025.01.14',
            likeCount: 1253,
            commentCount: 14,
            liked: false,
        },
        {
            id: '3',
            userEmail: 'ssafy509',
            content: 'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
            date: '2025.01.14',
            likeCount: 1253,
            commentCount: 14,
            liked: false,
        },
        {
            id: '4',
            userEmail: 'ssafy509',
            content: 'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
            date: '2025.01.14',
            likeCount: 1253,
            commentCount: 14,
            liked: true,
        },
    ]

    const navigate = useNavigate();
    const [answers, setAnswers] = useState(dummyData);

    const onBackClick = () => {
        navigate(-1);
    }

    const onAnswerClick = (id: string) => {
        navigate(`/today/otheranswers/${id}`);
    }


    const handleLikeClick = (answerId: string) => {
        setAnswers(prevAnswers => prevAnswers.map(answer => 
            answer.id === answerId 
                ? {
                    ...answer,
                    liked: !answer.liked,
                    likeCount: answer.liked ? answer.likeCount - 1 : answer.likeCount + 1
                }
                : answer
        ));
    };

    return <div className="py-10 px-20 bg-Main">
        <div className="flex flex-col gap-9 border border-primary-200 p-6 rounded-2xl bg-white">
            <RouteHeader title="다른 사람의 답변" onBackClick={onBackClick}/>
            <div className="flex flex-col gap-6">
                {answers.length > 0 ? answers.map((answer, id) => (   
                    <OtherAnswerItem key={id} id={answer.id} userEmail={answer.userEmail} content={answer.content} date={answer.date} likeCount={answer.likeCount} commentCount={answer.commentCount} liked={answer.liked} handleLikeClick={handleLikeClick} onAnswerClick={onAnswerClick}/>
                )): <div>다른 사람의 답변이 없습니다.</div>}
            </div>
        </div>
    </div>
}

export default OtherAnswerList;