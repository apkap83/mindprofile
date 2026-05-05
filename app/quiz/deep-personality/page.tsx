"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";

type Dimension = "O" | "C" | "E" | "A" | "N";

type Question = {
  question: string;
  dimension: Dimension;
  reverse: boolean;
};

type Scores = Record<Dimension, number>;

const QUESTIONS_PER_STEP = 5;

const questions: Question[] = [
  {
    question: "I feel energized when I am around other people.",
    dimension: "E",
    reverse: false,
  },
  {
    question: "I prefer quiet environments over social gatherings.",
    dimension: "E",
    reverse: true,
  },
  {
    question: "I try to avoid conflicts whenever possible.",
    dimension: "A",
    reverse: false,
  },
  {
    question: "I am often skeptical of others' intentions.",
    dimension: "A",
    reverse: true,
  },
  {
    question: "I like to have a clear plan before taking action.",
    dimension: "C",
    reverse: false,
  },
  {
    question: "I often act without thinking things through.",
    dimension: "C",
    reverse: true,
  },
  {
    question: "I frequently feel anxious or worried.",
    dimension: "N",
    reverse: false,
  },
  {
    question: "I remain calm even under pressure.",
    dimension: "N",
    reverse: true,
  },
  {
    question: "I enjoy exploring new ideas and concepts.",
    dimension: "O",
    reverse: false,
  },
  {
    question: "I prefer routine over novelty.",
    dimension: "O",
    reverse: true,
  },
  {
    question: "I find it easy to start conversations with strangers.",
    dimension: "E",
    reverse: false,
  },
  {
    question: "I tend to keep my thoughts to myself.",
    dimension: "E",
    reverse: true,
  },
  {
    question: "I am considerate of other people's feelings.",
    dimension: "A",
    reverse: false,
  },
  {
    question: "I can be blunt, even if it hurts others.",
    dimension: "A",
    reverse: true,
  },
  {
    question: "I complete tasks efficiently.",
    dimension: "C",
    reverse: false,
  },
  {
    question: "I struggle to stay organized.",
    dimension: "C",
    reverse: true,
  },
  {
    question: "I get stressed easily.",
    dimension: "N",
    reverse: false,
  },
  {
    question: "I rarely feel emotionally overwhelmed.",
    dimension: "N",
    reverse: true,
  },
  {
    question: "I enjoy artistic or creative activities.",
    dimension: "O",
    reverse: false,
  },
  {
    question: "I find abstract ideas confusing.",
    dimension: "O",
    reverse: true,
  },
];

const answerOptions = [
  {
    text: "Strongly Disagree",
    value: 1,
    className: "border-red-400 bg-red-400/10",
    selectedClassName: "bg-red-400/70",
  },
  {
    text: "Disagree",
    value: 2,
    className: "border-orange-400 bg-orange-400/10",
    selectedClassName: "bg-orange-400/70",
  },
  {
    text: "Neutral",
    value: 3,
    className: "border-white/40 bg-white/10",
    selectedClassName: "bg-white/60",
  },
  {
    text: "Agree",
    value: 4,
    className: "border-green-400 bg-green-400/10",
    selectedClassName: "bg-green-400/70",
  },
  {
    text: "Strongly Agree",
    value: 5,
    className: "border-emerald-400 bg-emerald-400/10",
    selectedClassName: "bg-emerald-400/70",
  },
];

const dimensionLabels: Record<Dimension, string> = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Emotional Sensitivity",
};

function calculateScores(answers: number[]): Scores {
  const scores: Scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  answers.forEach((value, index) => {
    const question = questions[index];
    const finalValue = question.reverse ? 6 - value : value;
    scores[question.dimension] += finalValue;
  });

  return scores;
}

function getDominantTrait(scores: Scores) {
  const entries = Object.entries(scores) as [Dimension, number][];
  const [dimension, score] = entries.sort((a, b) => b[1] - a[1])[0];

  return {
    dimension,
    score,
    label: dimensionLabels[dimension],
  };
}

function getResultDescription(dimension: Dimension) {
  const descriptions: Record<Dimension, string> = {
    O: "You are naturally drawn to ideas, imagination, creativity, and deeper meaning. You tend to question the obvious and search for hidden patterns.",
    C: "You are driven by structure, responsibility, and self-improvement. You feel best when life has direction, progress, and clear priorities.",
    E: "You gain energy from expression, interaction, and external stimulation. You are likely to process life by engaging with people and the world around you.",
    A: "You are highly tuned to harmony, trust, and other people’s emotions. You naturally consider how your actions affect those around you.",
    N: "You experience emotions deeply and notice internal shifts quickly. This can make you sensitive, reflective, and highly aware of stress or uncertainty.",
  };

  return descriptions[dimension];
}

function Background() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/landing-background-image.webp')",
        }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
    </>
  );
}

export default function DeepPersonalityQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_STEP);
  const startIndex = currentStep * QUESTIONS_PER_STEP;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_STEP,
  );

  const progress = (currentStep / totalSteps) * 100;

  const answersArray = questions.map((_, index) => answers[index] ?? 0);
  const scores = useMemo(() => calculateScores(answersArray), [answersArray]);
  const dominantTrait = useMemo(() => getDominantTrait(scores), [scores]);

  const allCurrentAnswered = currentQuestions.every(
    (_, index) => answers[startIndex + index] !== undefined,
  );

  const handleSelect = (questionIndex: number, value: number) => {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: value,
    }));
  };

  const handleNext = async () => {
    if (!allCurrentAnswered) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep((previous) => previous + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const finalAnswers = questions.map((_, index) => answers[index]);
    const finalScores = calculateScores(finalAnswers);
    const finalTrait = getDominantTrait(finalScores);

    setIsFinished(true);

    await fetch("/api/quiz-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizSlug: "deep-personality",
        score: Object.values(finalScores).reduce((sum, item) => sum + item, 0),
        result: finalTrait.label,
        answers: {
          rawAnswers: finalAnswers,
          scores: finalScores,
          dominantTrait: finalTrait,
        },
      }),
    });
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white">
        <Background />

        <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">
            Your dominant pattern
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            {dominantTrait.label}
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-200">
            {getResultDescription(dominantTrait.dimension)}
          </p>

          <div className="mb-8 grid w-full gap-4 text-left">
            {(Object.entries(scores) as [Dimension, number][]).map(
              ([dimension, score]) => (
                <div key={dimension}>
                  <div className="mb-1 flex justify-between text-sm text-slate-300">
                    <span>{dimensionLabels[dimension]}</span>
                    <span>{score}/20</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-purple-300"
                      style={{ width: `${(score / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>

          <button
            onClick={restartQuiz}
            className="rounded-xl bg-white px-7 py-3 font-semibold text-black shadow-lg transition hover:scale-105 hover:bg-purple-100"
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

      <section className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm font-semibold text-white/80">
            <span>{Math.round(progress)}%</span>
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-purple-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold md:text-3xl">
            Choose how accurately each statement reflects you.
          </h1>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-xs font-semibold text-white/80 shadow-xl backdrop-blur-xl md:text-sm">
          {answerOptions.map((option) => (
            <div
              key={option.value}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`h-11 w-11 rounded-full border-2 ${option.className}`}
              />
              <span>{option.text}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-5">
          {currentQuestions.map((question, localIndex) => {
            const questionIndex = startIndex + localIndex;
            const selectedValue = answers[questionIndex];

            return (
              <article
                key={question.question}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-xl"
              >
                <p className="mb-6 text-lg font-medium text-white md:text-xl">
                  {question.question}
                </p>

                <div className="grid grid-cols-5 gap-2">
                  {answerOptions.map((option) => {
                    const isSelected = selectedValue === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-label={option.text}
                        onClick={() =>
                          handleSelect(questionIndex, option.value)
                        }
                        className="flex justify-center"
                      >
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition hover:scale-110 ${
                            option.className
                          } ${
                            isSelected
                              ? `scale-110 ring-4 ring-white/30 ${option.selectedClassName}`
                              : ""
                          }`}
                        >
                          {isSelected && (
                            <Check className="h-7 w-7 stroke-[4] text-black" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-white/70">
          {allCurrentAnswered
            ? "You can continue."
            : "All questions must be answered before you continue."}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={!allCurrentAnswered}
          className="mt-5 w-full rounded-xl bg-white px-6 py-4 text-xl font-bold text-black shadow-lg transition hover:scale-[1.01] hover:bg-purple-100 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/50"
        >
          {currentStep === totalSteps - 1 ? "See My Result" : "Next"}
        </button>
      </section>
    </main>
  );
}
