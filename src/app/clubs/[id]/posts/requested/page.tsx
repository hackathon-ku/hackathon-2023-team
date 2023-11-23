import prisma from "@/lib/prisma";
import { cache } from "react";
import PostForm from "@/app/clubs/_components/PostForm";
import Link from "next/link";
import News from "@/app/_components/News";

interface RequestedPostsPageProps {
	params: { id: string };
}

const fetchNotApprovedPost = cache((clubId: number) =>
	prisma.post.findMany({
		where: { clubId: clubId, approved: true },
		include: { club: true, owner: true, likes: true },
	}),
);

export default async function requestedPostsPage({ params }: RequestedPostsPageProps) {
	const posts = await fetchNotApprovedPost(parseInt(params.id));
	const club = await prisma.club.findUnique({ where: { id: parseInt(params.id) } });

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
							<Link href={`/clubs/posts/${p.id}`} key={p.id}>
								<News post={p} />
							</Link>
					  ))
					: "No waiting requested posts"}
			</div>
		</div>
	);
}
