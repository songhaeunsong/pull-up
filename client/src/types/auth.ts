export interface DomainType {
  domain: 'google' | 'naver' | 'kakao';
}

export interface AuthResponseType {
  isSignedUp: boolean;
  isSolvedToday: boolean;
}
