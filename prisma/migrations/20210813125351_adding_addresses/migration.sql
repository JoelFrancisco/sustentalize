-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addresses" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
