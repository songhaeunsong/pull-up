import { Subject } from '@/types/member';

export const SUBJECT_OPTIONS: Array<{ id: Subject; name: string; icon: string }> = [
  { id: 'COMPUTER_ARCHITECTURE', name: '컴퓨터구조', icon: 'computerstructure' },
  { id: 'OPERATING_SYSTEM', name: '운영체제', icon: 'os' },
  { id: 'NETWORK', name: '네트워크', icon: 'network' },
  { id: 'DATABASE', name: '데이터베이스', icon: 'database' },
  { id: 'ALGORITHM', name: '알고리즘', icon: 'algorithm' },
  { id: 'DATA_STRUCTURE', name: '자료구조', icon: 'datastructure' },
];
