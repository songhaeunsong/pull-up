const subjectTranslations: Record<string, string> = {
  COMPUTER_ARCHITECTURE: '컴퓨터구조',
  OPERATING_SYSTEM: '운영체제',
  NETWORK: '네트워크',
  DATABASE: '데이터베이스',
  ALGORITHM: '알고리즘',
  DATA_STRUCTURE: '자료 구조',
};

export function convertSubject(subject: string): string {
  return subjectTranslations[subject] || subject;
}
