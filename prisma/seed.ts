import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const quizData = {
  title: "Know Yourself",
  slug: "test1",
  description: "A deep personality discovery quiz",
  data: {
    questions: [
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
    ],
  },
};

async function main() {
  await prisma.quiz.upsert({
    where: { slug: quizData.slug },
    update: quizData,
    create: quizData,
  });

  console.log("✅ Quiz seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
