const subjectTranslations: Record<string, string> = {
  COMPUTER_ARCHITECTURE: '컴퓨터구조',
  OPERATING_SYSTEM: '운영체제',
  NETWORK: '네트워크',
  DATABASE: '데이터베이스',
  ALGORITHM: '알고리즘',
  DATA_STRUCTURE: '자료 구조',
};

// 함수 오버로딩 선언
export function convertSubject(subject: string): string;
export function convertSubject(subject: string[]): string[];

// 리스트인지 단일 문자열 모두 처리
export function convertSubject(subject: string | string[]): string | string[] {
  if (Array.isArray(subject)) {
    return subject.map((s) => subjectTranslations[s] || s); // 리스트 변환
  }
  return subjectTranslations[subject] || subject; // 단일 문자열 변환
}
