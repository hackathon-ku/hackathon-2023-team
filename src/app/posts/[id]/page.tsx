import PostDetail from "@/components/PostDetail";
import prisma from "@/lib/prisma";
import { PostIncludeAll } from "@/types/post";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { cache } from "react";
import CarouselWrapper from "./_components/CarouselWrapper";
import CommentBox from "../../../components/CommentBox";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface PostDetailPageProps {
	params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
	const session = await getServerSession(authOptions);

	const post: PostIncludeAll | null = await prisma.post.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			club: true,
			owner: true,
			likes: true,
			comments: { select: { id: true, message: true, createdAt: true, user: true }, orderBy: { createdAt: "desc" } },
		},
	});

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className="flex min-h-screen flex-col items-center bg-white">
			<div className="w-full relative">
				<CarouselWrapper />
				<div className="w-full -mt-[20px] relative z-10 px-[24px] py-[15px] font-bold bg-[#006664] text-white rounded-t-xl">
					{post.club.label}
				</div>
			</div>
			<PostDetail post={post} />
			<div className="w-full px-[24px] pb-[24px] flex flex-col gap-[15px]">
				{post.comments.map((c) => (
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
		</div>
	);
}
