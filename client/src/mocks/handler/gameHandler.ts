import { http, HttpResponse } from 'msw';

const cards = [
  { cardId: 1, type: 'question', disabled: false, content: 'What is the capital of France?' },
  { cardId: 1, type: 'answer', disabled: false, content: 'Paris' },
  { cardId: 2, type: 'question', disabled: false, content: 'What is 2 + 2?' },
  { cardId: 2, type: 'answer', disabled: false, content: '4' },
  { cardId: 3, type: 'question', disabled: false, content: 'What is the boiling point of water in Celsius?' },
  { cardId: 3, type: 'answer', disabled: false, content: '100' },
  { cardId: 4, type: 'question', disabled: false, content: 'Who wrote "Romeo and Juliet"?' },
  { cardId: 4, type: 'answer', disabled: false, content: 'William Shakespeare' },
  { cardId: 5, type: 'question', disabled: false, content: 'What is the chemical symbol for gold?' },
  { cardId: 5, type: 'answer', disabled: false, content: 'Au' },
  { cardId: 6, type: 'question', disabled: false, content: 'Which planet is known as the Red Planet?' },
  { cardId: 6, type: 'answer', disabled: false, content: 'Mars' },
  { cardId: 7, type: 'question', disabled: false, content: 'How many continents are there on Earth?' },
  { cardId: 7, type: 'answer', disabled: false, content: '7' },
  { cardId: 8, type: 'question', disabled: false, content: 'What is the largest ocean on Earth?' },
  { cardId: 8, type: 'answer', disabled: false, content: 'Pacific Ocean' },
];

export const gameHandler = [
  http.post('http://localhost:8080/api/v1/game/room', async ({ request }) => {
    const { memberId } = (await request.json()) as { memberId: string };

    if (typeof memberId === 'string') {
      return HttpResponse.json(
        {
          roomId: '1234',
          roomStatus: 'WAITING',
          player1P: {
            memberId: memberId,
            name: '송하은',
          },
        },
        {
          status: 200,
        },
      );
    }
  }),

  http.get('http://localhost:8080/api/v1/game/problems?limit=15', async () => {
    return HttpResponse.json(cards, {
      status: 200,
    });
  }),
];
