-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PROFESSOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "college_register" VARCHAR(10) NOT NULL,
    "user_role" "UserRole" NOT NULL DEFAULT 'USER',
    "entry_type" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "xp_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
