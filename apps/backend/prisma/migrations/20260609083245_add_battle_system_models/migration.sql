-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ProgrammingLanguage" AS ENUM ('JAVA', 'PYTHON', 'CPP', 'JAVASCRIPT');

-- AlterTable
ALTER TABLE "battle_rooms" ADD COLUMN     "difficulty" "Difficulty",
ADD COLUMN     "ended_at" TIMESTAMP(3),
ADD COLUMN     "problem_id" TEXT,
ADD COLUMN     "started_at" TIMESTAMP(3),
ADD COLUMN     "topic" TEXT;

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "topic" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "constraints" TEXT[],
    "boilerplate" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle_results" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "winner_id" TEXT NOT NULL,
    "loser_id" TEXT NOT NULL,
    "winner_time" INTEGER NOT NULL,
    "loser_time" INTEGER,
    "credits_awarded" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "battle_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "problems_difficulty_idx" ON "problems"("difficulty");

-- CreateIndex
CREATE INDEX "problems_topic_idx" ON "problems"("topic");

-- CreateIndex
CREATE INDEX "battle_results_winner_id_idx" ON "battle_results"("winner_id");

-- CreateIndex
CREATE INDEX "battle_results_loser_id_idx" ON "battle_results"("loser_id");

-- CreateIndex
CREATE UNIQUE INDEX "battle_results_room_id_key" ON "battle_results"("room_id");

-- CreateIndex
CREATE INDEX "battle_rooms_problem_id_idx" ON "battle_rooms"("problem_id");

-- AddForeignKey
ALTER TABLE "battle_results" ADD CONSTRAINT "battle_results_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "battle_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_results" ADD CONSTRAINT "battle_results_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_results" ADD CONSTRAINT "battle_results_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_rooms" ADD CONSTRAINT "battle_rooms_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
