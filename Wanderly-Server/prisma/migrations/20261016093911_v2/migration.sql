-- CreateTable
CREATE TABLE "registerUsers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "registerUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registerUsers_email_key" ON "registerUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registerUsers_userId_key" ON "registerUsers"("userId");

-- CreateIndex
CREATE INDEX "idx_registerUsers_email" ON "registerUsers"("email");

-- CreateIndex
CREATE INDEX "idx_registerUsers_isDeleted" ON "registerUsers"("isDeleted");

-- AddForeignKey
ALTER TABLE "registerUsers" ADD CONSTRAINT "registerUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
