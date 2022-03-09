-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "event_date" DATE NOT NULL,
    "event_group" VARCHAR(100) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remainder" (
    "reminder_id" SERIAL NOT NULL,
    "remainder_date" DATE NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Remainder_pkey" PRIMARY KEY ("reminder_id")
);

-- AddForeignKey
ALTER TABLE "Remainder" ADD CONSTRAINT "Remainder_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
