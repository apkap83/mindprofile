import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/landing-page-bg-image.png')",
        }}
      />

      {/* 🔥 Dark Overlay (IMPORTANT for readability) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🔥 Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Who You Really Are
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto">
          Take quick, science-inspired quizzes to uncover your personality,
          mindset, and hidden patterns.
        </p>

        <Link
          href="/quiz"
          className="bg-white text-black px-6 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
          Start Your First Quiz 🚀
        </Link>
      </div>
    </main>
  );
}
