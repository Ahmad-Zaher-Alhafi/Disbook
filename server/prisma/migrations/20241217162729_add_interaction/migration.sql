-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InteractionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InteractionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InteractionToUser_B_index" ON "_InteractionToUser"("B");

-- AddForeignKey
ALTER TABLE "_InteractionToUser" ADD CONSTRAINT "_InteractionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Interaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InteractionToUser" ADD CONSTRAINT "_InteractionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
