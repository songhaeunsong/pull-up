import Keyword from "./keyword";

interface KeywordListProps {
    keywords: {
        title: string
        correct: boolean
    }[];
}

const KeywordList = ({keywords}: KeywordListProps) => {
    return <div className="flex gap-2 items-center">
        <div
            className="px-3 py-1 font-semibold border-2 rounded-lg border-primary-200 bg-primary-50 text-primary-500"
        >
            키워드
        </div>
        {keywords.map((keyword, id) => (
            <Keyword key={id} title={keyword.title} color={keyword.correct ? 'purple' : 'gray'} />
        ))}
    </div>
}

export default KeywordList;