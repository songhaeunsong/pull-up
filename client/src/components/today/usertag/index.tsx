interface UserTagProps {
    userEmail: string;
}

const UserTag = ({userEmail}: UserTagProps) => {
    return <div className="px-7 py-1 bg-secondary-50 border border-secondary-600 text-secondary-600 font-medium rounded-2xl text-sm">{userEmail}</div>
}

export default UserTag;