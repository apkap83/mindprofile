import Link from "next/link";

const quizCategories = [
  {
    title: "Core Personality",
    description:
      "Understand your natural thinking style, emotional patterns, and inner motivations.",
    quizzes: [
      {
        title: "Who Are You Really?",
        description:
          "A quick psychological profile based on how you think, react, and make decisions.",
        href: "/quiz/test1",
        label: "5 questions",
      },
      {
        title: "Thinker or Doer?",
        description:
          "Find out whether you naturally analyze, act, observe, or build.",
        href: "#",
        label: "Coming soon",
      },
    ],
  },
  {
    title: "Emotional Patterns",
    description:
      "Explore how you respond to pressure, conflict, stress, and emotional uncertainty.",
    quizzes: [
      {
        title: "How Do You Handle Stress?",
        description:
          "Discover your hidden stress response and what it says about your personality.",
        href: "#",
        label: "Coming soon",
      },
      {
        title: "Are You Emotionally Reactive?",
        description:
          "Measure how quickly emotions influence your decisions and relationships.",
        href: "#",
        label: "Coming soon",
      },
    ],
  },
  {
    title: "Mindset & Growth",
    description:
      "Reveal your discipline, ambition, resilience, and relationship with personal progress.",
    quizzes: [
      {
        title: "Builder or Dreamer?",
        description:
          "Find out whether your mindset is driven more by vision, action, freedom, or mastery.",
        href: "#",
        label: "Coming soon",
      },
      {
        title: "How Disciplined Are You?",
        description:
          "A short test about consistency, self-control, and long-term focus.",
        href: "#",
        label: "Coming soon",
      },
    ],
  },
  {
    title: "Relationships & Social Energy",
    description:
      "Understand how you connect with people, protect your energy, and build trust.",
    quizzes: [
      {
        title: "Introvert, Extrovert, or Ambivert?",
        description:
          "Discover how your social energy really works beneath the surface.",
        href: "#",
        label: "Coming soon",
      },
      {
        title: "What Kind of Friend Are You?",
        description:
          "Explore your loyalty, emotional availability, and communication style.",
        href: "#",
        label: "Coming soon",
      },
    ],
  },
];

export default function QuizHubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/landing-background-image.webp')",
        }}
      />

      <div className="absolute inset-0 bg-black/75" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-purple-300">
            MindProfile Assessments
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            Choose What You Want to Discover
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-200">
            Explore structured, psychology-inspired quizzes designed to reveal
            patterns in your personality, emotions, mindset, and relationships.
          </p>
        </div>

        <div className="grid gap-8">
          {quizCategories.map((category) => (
            <section
              key={category.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8"
            >
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  {category.title}
                </h2>

                <p className="max-w-3xl text-gray-300">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {category.quizzes.map((quiz) => {
                  const isAvailable = quiz.href !== "#";

                  const cardContent = (
                    <div
                      className={`h-full rounded-2xl border border-white/10 bg-black/25 p-5 transition ${
                        isAvailable
                          ? "hover:scale-[1.02] hover:bg-white/15"
                          : "opacity-60"
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <h3 className="text-xl font-bold">{quiz.title}</h3>

                        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-purple-200">
                          {quiz.label}
                        </span>
                      </div>

                      <p className="mb-5 leading-7 text-gray-300">
                        {quiz.description}
                      </p>

                      <span className="text-sm font-semibold text-white">
                        {isAvailable ? "Start quiz →" : "Coming soon"}
                      </span>
                    </div>
                  );

                  return isAvailable ? (
                    <Link key={quiz.title} href={quiz.href}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={quiz.title}>{cardContent}</div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
