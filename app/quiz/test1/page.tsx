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
      const finalScore = score + answerScore;

      setScore(finalScore);
      setIsFinished(true);

      // 🔥 SAVE TO DB
      fetch("/api/quiz-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: finalScore,
          result: getResult(finalScore).title,
          quizSlug: "test1",
          answers: {}, // later you can store detailed answers
        }),
      });

      return;
    }

    setScore(newScore);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  // 🔥 Shared background wrapper
  const Background = () => (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/landing-page-bg-image.png')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
    </>
  );

  if (isFinished) {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white">
        <Background />

        <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">
            Your MindProfile result
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            {result.title}
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-200">
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
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white">
      <Background />

      <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-2xl flex-col justify-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex justify-between text-sm text-slate-300">
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

        {/* Question */}
        <h1 className="mb-8 text-3xl font-bold leading-tight md:text-5xl">
          {currentQuestion.question}
        </h1>

        {/* Answers */}
        <div className="grid gap-4">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.text}
              onClick={() => handleAnswer(answer.score)}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-lg transition hover:scale-[1.02] hover:bg-white/10"
            >
              {answer.text} {answer.score}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
