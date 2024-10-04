import prisma from "@/db";

export default async function Home() {
  const rooms = await prisma.room.findMany();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {rooms.map((room) => {
        return <div key={room.id}>{room.name}</div>;
      })}
    </main>
  );
}
