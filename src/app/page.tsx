import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import "@mantine/dates/styles.css";
import CalendarWrapper from "@/components/CalendarWrapper";
import News from "@/components/News";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type PostInclude = Prisma.PostGetPayload<{
	include: {
		club: true;
		owner: true;
		likes: true;
	};
}>;

export default async function EventPage() {
	const events = await prisma.event.findMany({
		where: { approved: true },
		include: { club: true },
	});
	const posts: PostInclude[] = await prisma.post.findMany({
		where: { approved: true },
		include: { club: true, owner: true, likes: true },
	});

	return (
		<main className="flex min-h-screen flex-col items-center p-12 bg-white gap-8">
			<h1 className="self-start text-2xl font-bold">ตารางอีเว้นท์และกิจกรรม</h1>
			<CalendarWrapper events={events} />
			<h1 className="self-start text-2xl font-bold">โพสต์</h1>
			{posts.map((p) => (
				<News post={p} key={p.id} />
			))}
			<button className="self-end rounded-full py-1.5 px-6 border border-[#006664] text-[#006664] text-sm">
				ข่าวสารทั้งหมด
			</button>
		</main>
	);
}
