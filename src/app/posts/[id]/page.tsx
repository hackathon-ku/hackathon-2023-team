import PostDetail from "@/components/PostDetail";
import prisma from "@/lib/prisma";
import { PostIncludeAll } from "@/types/post";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { cache } from "react";
import { Carousel } from "@mantine/carousel";
import CarouselWrapper from "./_components/CarouselWrapper";
import Comment from "./_components/Comment";

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
				<CarouselWrapper />
				<div className="absolute w-full -bottom-5 p-3 font-bold bg-[#006664] text-white rounded-t-xl">
					{post.club.label}
				</div>
			</div>
			<PostDetail post={post} />
			<div className="w-full px-8 flex flex-col gap-3">
			{post.comments.map((c) => (
				<Comment key={c.id} name={"Dan"} message={c.message} createdAt={c.createdAt} />
			))}
			</div>

		</div>
	);
}
