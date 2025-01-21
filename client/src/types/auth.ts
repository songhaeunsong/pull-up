export interface DomainType {
  domain: 'google' | 'naver' | 'kakao';
}

export interface LoginResponseType {
  userInfo: UserInfo;
  isSignedUp: boolean;
  isSolvedToday: boolean;
}

export interface UserInfo {
  userId: string;
}
