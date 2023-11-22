import PostDetail from "@/components/PostDetail";
import prisma from "@/lib/prisma";
import { PostIncludeAll } from "@/types/post";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { cache } from "react";

interface PostDetailPageProps {
	params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
	const post: PostIncludeAll | null = await prisma.post.findUnique({
		where: { id: parseInt(params.id) },
		include: { club: true, owner: true, likes: true, comments: { orderBy: { createdAt: "desc" } } },
	});

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className="flex min-h-screen flex-col items-center bg-white">
			<div className="h-fit w-full relative">
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
				<div className="absolute w-full bottom-0 p-3 font-bold bg-[#006664] text-white rounded-t-xl">
					{post.club.label}
				</div>
			</div>
			<PostDetail post={post} />
			{post.comments.map((c) => (
				<span key={c.id}>{c.message}</span>
			))}
		</div>
	);
}
