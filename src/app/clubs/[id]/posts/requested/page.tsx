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

interface RequestedPostsPageProps {
	params: { id: string };
}

const fetchNotApprovedPost = cache((clubId: number) =>
	prisma.post.findMany({
		where: { clubId: clubId, approved: true },
		include: { club: true, owner: true, likes: true },
	}),
);

const fetchMemberByUserId = cache((userId: number) =>
	prisma.member.findUnique({
		where: { userId: userId },
	}),
);

export default async function RequestedPostsPage({ params }: RequestedPostsPageProps) {
	const posts = await fetchNotApprovedPost(parseInt(params.id));
	const club = await prisma.club.findUnique({ where: { id: parseInt(params.id) } });
	const session = await getServerSession(authOptions);
	const member = session ? await fetchMemberByUserId(session.user.id) : undefined;

	if (!club) return null;

	return (
		<div className="flex flex-col">
			<div className="bg-[#006664] px-6 py-4">
				<span className="text-white font-bold">{club.label}</span>
			</div>
			<div className="p-[24px] flex flex-col gap-[20px] items-center">
				<div className="flex justify-between w-full"></div>
				{posts
					? posts.map((p) => (
							<div key={p.id}>
								<News post={p} role={member?.role} />
							</div>
					  ))
					: "No waiting requested posts"}
			</div>
		</div>
	);
}
