import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/landing-background-image.webp')",
        }}
      />

      {/* Optional light overlay (keep it subtle) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Glass Card */}
      <div className="relative z-10 px-4">
        <div className="backdrop-blur-xs bg-white/5 border border-white/20 rounded-2xl px-8 py-10 text-center max-w-2xl mx-auto shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Who You Really Are
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Take carefully designed, psychology-inspired quizzes that reveal
            deeper patterns in your personality, thinking, and behavior.
          </p>

          <Link
            href="/quiz"
            className="bg-white text-black px-6 py-3 rounded-xl text-lg font-semibold hover:scale-115 transition-all shadow-lg"
          >
            Start Your First Quiz 🚀
          </Link>
        </div>
      </div>
    </main>
  );
}
