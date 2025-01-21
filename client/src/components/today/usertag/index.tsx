interface UserTagProps {
  userEmail: string;
}

const UserTag = ({ userEmail }: UserTagProps) => {
  return (
    <div className="rounded-2xl border border-secondary-600 bg-secondary-50 px-7 py-1 text-sm font-medium text-secondary-600">
      {userEmail}
    </div>
  );
};

export default UserTag;
