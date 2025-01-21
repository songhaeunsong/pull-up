import { DomainType } from '@/types/auth';

const { VITE_BASE_URI } = import.meta.env;

export const OAuthLogin = (domain: DomainType) => {
  window.location.href = `${VITE_BASE_URI}/oauth2/authoriaztion/${domain}`;
};
