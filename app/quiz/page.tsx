"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    question: "When you face a difficult decision, what do you usually do?",
    answers: [
      { text: "I trust my gut immediately", score: 2 },
      { text: "I analyze every possible outcome", score: 4 },
      { text: "I ask someone I trust", score: 3 },
      { text: "I delay it until I must decide", score: 1 },
    ],
  },
  {
    question: "What drains your energy the most?",
    answers: [
      { text: "Too much social interaction", score: 4 },
      { text: "Lack of progress", score: 3 },
      { text: "Conflict with others", score: 2 },
      { text: "Routine and boredom", score: 1 },
    ],
  },
  {
    question: "How do you usually handle stress?",
    answers: [
      { text: "I stay calm and solve the problem", score: 4 },
      { text: "I overthink everything", score: 2 },
      { text: "I distract myself", score: 1 },
      { text: "I talk it out with someone", score: 3 },
    ],
  },
  {
    question: "What motivates you the most?",
    answers: [
      { text: "Freedom", score: 1 },
      { text: "Achievement", score: 4 },
      { text: "Connection", score: 2 },
      { text: "Understanding myself", score: 3 },
    ],
  },
  {
    question: "Which sentence sounds most like you?",
    answers: [
      { text: "I want to understand why I am the way I am.", score: 3 },
      { text: "I want to become stronger and more disciplined.", score: 4 },
      { text: "I want peace and emotional balance.", score: 2 },
      { text: "I want more excitement and freedom.", score: 1 },
    ],
  },
];

function getResult(score: number) {
  if (score <= 8) {
    return {
      title: "The Free Spirit",
      description:
        "You value freedom, variety, and independence. You dislike feeling trapped and you are at your best when life feels open and flexible.",
    };
  }

  if (score <= 13) {
    return {
      title: "The Emotional Navigator",
      description:
        "You are sensitive to your environment and deeply aware of emotions. You often understand what others feel before they say it.",
    };
  }

  if (score <= 17) {
    return {
      title: "The Deep Thinker",
      description:
        "You naturally search for meaning. You analyze your behavior, your choices, and the hidden patterns behind your personality.",
    };
  }

  return {
    title: "The Builder",
    description:
      "You are driven by growth, progress, and self-mastery. You want to improve yourself and you are willing to do the work.",
  };
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const result = useMemo(() => getResult(score), [score]);

  const handleAnswer = (answerScore: number) => {
    const newScore = score + answerScore;

    if (currentQuestionIndex === questions.length - 1) {
      setScore(newScore);
      setIsFinished(true);
      return;
    }

    setScore(newScore);
    setCurrentQuestionIndex((previous) => previous + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <main className="min-h-screen bg-[#0b1020] px-4 py-10 text-white">
        <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">
            Your MindProfile result
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            {result.title}
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-300">
            {result.description}
          </p>

          <button
            onClick={restartQuiz}
            className="rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:scale-105"
          >
            Take the quiz again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1020] px-4 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col justify-center">
        <div className="mb-8">
          <div className="mb-3 flex justify-between text-sm text-slate-400">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-purple-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h1 className="mb-8 text-3xl font-bold leading-tight md:text-5xl">
          {currentQuestion.question}
        </h1>

        <div className="grid gap-4">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.text}
              onClick={() => handleAnswer(answer.score)}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-lg transition hover:scale-[1.02] hover:bg-white/10"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
