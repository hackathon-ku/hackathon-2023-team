import prisma from "@/lib/prisma";
import { cache } from "react";
import PostForm from "@/app/clubs/_components/PostForm";
import Link from "next/link";
import News from "@/app/_components/News";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import Modal from "@/components/CustomModal";
import { Post, User } from "@prisma/client";
import CustomModal from "@/components/CustomModal";
import { useDisclosure } from "@mantine/hooks";
import NewsEvent from "@/app/_components/NewsEvent";

interface RequestedPostsPageProps {
	params: { id: string };
}

const fetchPostsNotApprovedPost = cache((clubId: number) =>
	prisma.post.findMany({
		where: { clubId: clubId, approved: false },
		include: { club: true, owner: true, likes: true },
	}),
);

const fetchEventsNotApprovedPost = cache((clubId: number) =>
	prisma.event.findMany({
		where: { clubId: clubId, approved: false },
		include: { club: true, owner: true, likes: true },
	}),
);

const fetchMemberByUserId = cache((userId: number) =>
	prisma.member.findUnique({
		where: { userId: userId },
	}),
);

const fetchUserByUserId = cache((userId: number) =>
	prisma.user.findUnique({
		where: { id: userId },
	}),
);

export default async function RequestedPostsPage({ params }: RequestedPostsPageProps) {
	// const posts = await fetchPostsNotApprovedPost(parseInt(params.id));
	// const events = await fetchEventsNotApprovedPost(parseInt(params.id));
	// const postsAndEvents = [... posts, ... events];
	const club = await prisma.club.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			posts: {
				where: { approved: false },
				orderBy: { createdAt: "desc" },
				include: { club: true, owner: true, likes: true },
			},
			events: {
				where: { approved: false },
				orderBy: { createdAt: "desc" },
				include: { club: true, owner: { select: { user: true } }, likes: true },
			},
		},
	});
	const session = await getServerSession(authOptions);
	const member = session ? await fetchMemberByUserId(session.user.id) : undefined;

	if (!club) return null;

	return (
		<div className="flex flex-col">
			<div className="px-6 pt-4">
				<span className="text-[#2F3337] text-2xl font-bold">{club.label}</span>
			</div>

			<div className="p-[24px] flex flex-col gap-[20px] ">
				<p className="font-bold text-base">อนุมัติโพสต์</p>
				<div className="items-center">
					<div className="flex justify-between w-full"></div>
					{club.events
						? club.events.map((p) => (
								<div key={p.id}>
									<NewsEvent event={p} role={member?.role} />
								</div>
						  ))
						: "No waiting requested posts"}
					{club.posts
						? club.posts.map((p) => (
								<div key={p.id}>
									<News post={p} role={member?.role} />
								</div>
						  ))
						: "No waiting requested posts"}
				</div>
			</div>
		</div>
	);
}
