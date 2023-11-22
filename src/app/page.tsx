import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import "@mantine/dates/styles.css";
import CalendarWrapper from "@/components/CalendarWrapper";
import News from "@/components/News";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EventPage() {
  const events = await prisma.event.findMany({
    where: { approved: true },
    include: { club: true },
  });

  const posts = await prisma.post.findMany({
    where: { approved: false },
    include: { club: true, owner: true }
  })

  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center p-[24px] bg-white gap-[20px]">
      <h1 className="self-start text-2xl font-bold">ตารางอีเว้นท์และกิจกรรม</h1>
      <CalendarWrapper events={events} />
      <h1 className="self-start text-2xl font-bold">ข่าวสารจากชมรม</h1>
      {posts.map(p => <Link href={`/clubs/posts/${p.id}`} key={p.id}>
        <News name={p.club.label} date={p.createdAt} postBy={p.owner.firstNameTh} detail={p.content} img={"/event.png"} postId={p.id} tag={p.type}/>
      </Link>)}
      <button className="self-end rounded-full py-1.5 px-6 border border-[#006664] text-[#006664] text-sm">
        ข่าวสารทั้งหมด
      </button>
    </main>
  );
}
