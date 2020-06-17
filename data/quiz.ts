// Used only for seeding the database.
export const quizDefinitions = [
  {
    title: "Filmy",
    description: "Sprawdź swoją wiedzę o kinematografii.",
    questions: [
      {
        question: "Ilu było pancernych i psa?",
        answer: "5",
        penalty: 4,
      },
      {
        question: "Ile palców ma Myszka Miki u ręki?",
        answer: "4",
        penalty: 6,
      },
      {
        question: "Królewna Śnieżka i ilu krasnoludków?",
        answer: "7",
        penalty: 2,
      },
      {
        question: "Ilu było gniewnych ludzi?",
        answer: "12",
        penalty: 7,
      },
    ],
  },
  {
    title: "Liczby pierwsze",
    description: "Pamiętasz coś jeszcze z matematyki?",
    questions: [
      {
        question: "Jaka jest największa liczba pierwsza w rozkładzie 1337?",
        answer: "191",
        penalty: 100,
      },
      {
        question: "Jaka jest najmniejsza liczba pierwsza?",
        answer: "1",
        penalty: 200,
      },
      {
        question: "Ile jest liczb pierwszych podzielnych przez 15?",
        answer: "0",
        penalty: 300,
      },
      {
        question: "Jaka liczba pierwsza pojawia się najczęściej w rozkładzie 63?",
        answer: "3",
        penalty: 400,
      },
    ],
  },
  {
    title: "Potyczki uniwersyteckie",
    description: "Tylko najlepsi laboranci potrafią rozwiązać ten quiz.",
    questions: [
      {
        question: "Na jaką ocenę zasługuje to rozwiązanie?",
        answer: "5",
        penalty: 1000,
      },
      {
        question: "Jaką ocenę końcową z Aplikacji WWW powinien dostać autor tego rozwiązania?",
        answer: "5",
        penalty: 87342372987438,
      },
    ],
  },
];
