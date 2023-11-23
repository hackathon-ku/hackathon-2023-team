import EventDetail from "@/components/EventDetail";
import CommentBox from "@/components/CommentBox";
import prisma from "@/lib/prisma";
import { EventIncludeAll } from "@/types/event";
import Image from "next/image";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import News from "@/app/_components/News";

interface EventDetailPageProps {
	params: { id: string };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
	const session = await getServerSession(authOptions);

	const event: EventIncludeAll | null = await prisma.event.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			club: true,
			owner: { select: { user: true } },
			likes: true,
			comments: { select: { id: true, message: true, createdAt: true, user: true }, orderBy: { createdAt: "desc" } },
			followers: true,
		},
	});

	const club = await prisma.club.findUnique({
		where: { id: event?.clubId },
		include: { posts: { include: { owner: true, likes: true, club: true } } },
	});

	if (!event) {
		return <div>Event not found</div>;
	}

	return (
		<div className="flex min-h-screen flex-col items-center bg-white">
			<div className="h-fit w-full relative">
				<Image
					src={event.imageUrl || "/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
				<div className="absolute w-full bottom-0 p-3 font-bold bg-[#006664] text-white rounded-t-xl">
					{event.club.label}
				</div>
			</div>
			<EventDetail event={event} />
			<div className="w-full px-8 flex flex-col gap-3 mb-4">
				{event.comments.map((c) => (
					<CommentBox
						name={`${c.user.firstNameTh} ${c.user.lastNameTh}`}
						message={c.message}
						createdAt={c.createdAt}
						isYou={session?.user.id === c.user.id}
						firstChar={c.user.firstNameEn.substring(0, 1)}
						key={c.id}
					/>
				))}
			</div>
			<p className="font-bold text-[24px] w-full px-8 mb-2">โพสต์ต่างๆจากชมรม</p>
			<div className="w-full px-8 flex flex-col gap-4">
				{club?.posts.map((p) => (
					<News post={p} key={p.id} />
				))}
			</div>
		</div>
	);
}
