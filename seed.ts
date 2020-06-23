// Data used to seed the database.

export const userDefinitions = [
  {
    id: 1,
    username: "hugo",
    password: "password",
  },
  {
    id: 2,
    username: "user1",
    password: "user1",
  },
  {
    id: 3,
    username: "user2",
    password: "user2",
  },
];

export const quizDefinitions = [
  {
    id: 1,
    title: "Filmy",
    description: "Sprawdź swoją wiedzę o kinematografii.",
    questions: [
      {
        id: 1,
        question: "Ilu było pancernych i psa?",
        answer: "5",
        penalty: 4,
      },
      {
        id: 2,
        question: "Ile palców ma Myszka Miki u ręki?",
        answer: "4",
        penalty: 6,
      },
      {
        id: 3,
        question: "Królewna Śnieżka i ilu krasnoludków?",
        answer: "7",
        penalty: 2,
      },
      {
        id: 4,
        question: "Ilu było gniewnych ludzi?",
        answer: "12",
        penalty: 7,
      },
    ],
  },
  {
    id: 2,
    title: "Liczby pierwsze",
    description: "Pamiętasz coś jeszcze z matematyki?",
    questions: [
      {
        id: 5,
        question: "Jaka jest największa liczba pierwsza w rozkładzie 1337?",
        answer: "191",
        penalty: 100,
      },
      {
        id: 6,
        question: "Jaka jest najmniejsza liczba pierwsza?",
        answer: "1",
        penalty: 200,
      },
      {
        id: 7,
        question: "Ile jest liczb pierwszych podzielnych przez 15?",
        answer: "0",
        penalty: 300,
      },
      {
        id: 8,
        question: "Jaka liczba pierwsza pojawia się najczęściej w rozkładzie 63?",
        answer: "3",
        penalty: 400,
      },
    ],
  },
  {
    id: 3,
    title: "Potyczki uniwersyteckie",
    description: "Tylko najlepsi laboranci potrafią rozwiązać ten quiz.",
    questions: [
      {
        id: 9,
        question: "Na jaką ocenę zasługuje to rozwiązanie?",
        answer: "5",
        penalty: 1000,
      },
      {
        id: 10,
        question: "Jaką ocenę końcową z Aplikacji WWW powinien dostać autor tego rozwiązania?",
        answer: "5",
        penalty: 87342372987438,
      },
    ],
  },
];

export const answerDefinitions = [
  {
    userId: 1,
    questionId: 9,
    answer: "5",
    time: 2500,
    correct: true,
  },
  {
    userId: 1,
    questionId: 10,
    answer: "4",
    time: 7000,
    correct: false,
  },
];

export const scoreDefinitions = [
  {
    userId: 1,
    quizId: 3,
    score: 2500 + 7000 + 87342372987438000,
  },
];
