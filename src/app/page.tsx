import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import "@mantine/dates/styles.css";
import CalendarWrapper from "@/app/_components/CalendarWrapper";
import News from "@/app/_components/News";
import prisma from "@/lib/prisma";
import { PostType, Prisma } from "@prisma/client";
import Link from "next/link";
import Search from "@/components/Search";
import AutocompleteWrapper from "./_components/AutocompleteWrapper";
import SelectWrapper from "./_components/SelectWrapper";
import CalendarWithFilter from "./_components/CalendarWithFilter";

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
		where: {
			type: { in: [PostType.NEWS, PostType.NORMAL_POST] },
			approved: true,
		},
		include: { club: true, owner: true, likes: true },
	});

	const clubs = await prisma.club.findMany();

	const session = await getServerSession(authOptions);

	return (
		<main className="flex min-h-screen flex-col items-center p-[24px] bg-white gap-[20px]">
			<AutocompleteWrapper data={clubs.map((c) => ({ id: c.id.toString(), label: c.label, value: c.id.toString() }))} />
			<h1 className="self-start text-2xl font-bold">ตารางอีเว้นท์และกิจกรรม</h1>
			<CalendarWithFilter events={events} />
			<h1 className="self-start text-2xl font-bold">ข่าวสารจากชมรม</h1>
			{posts.map((p) => (
				<News post={p} key={p.id} />
			))}
			<button className="self-end rounded-full py-1.5 px-6 border border-[#006664] text-[#006664] text-sm">
				ข่าวสารทั้งหมด
			</button>
		</main>
	);
}
