"use client";

import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import { PostType } from "@prisma/client";
import Tag from "@/components/Tag";
import Link from "next/link";
import { PostInclude } from "@/app/page";
import LikeButton from "@/components/LikeButton";
import { ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import axios from "axios";
import { postTypeToColorMap, postTypeToLabelPost } from "@/lib/post";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
interface NewsProps {
	post: PostInclude;
}

dayjs.extend(relativeTime);
dayjs.locale("th");

const News: React.FC<NewsProps> = ({ post }) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	const [likeCount, setLikeCount] = useState<number>(post.likes.length);
	const [isLike, setIsLike] = useState<boolean>(
		isAuthenticated ? post.likes.some((like) => like.userId === session.data.user.id) : false,
	);

	useEffect(() => {
		if (isAuthenticated) {
			setIsLike(post.likes.some((like) => like.userId === session.data.user.id));
		} else {
			setIsLike(false);
		}
	}, [isAuthenticated, session, post]);

	const like = () => {
		setIsLike((prev) => !prev);
		setLikeCount((prev) => prev + 1);
	};
	const unlike = async () => {
		setIsLike((prev) => !prev);
		setLikeCount((prev) => prev - 1);
	};

	const truncateText = (text: string) => (text.length >= 100 ? text.substring(0, 99) + "..." : text);
	const getPreviousTime = (date: Date) => dayjs(date).fromNow();

	return (
		<div className="w-full p-[15px] border rounded-[20px] shadow-sm">
			<header className="flex items-start gap-[10px] mb-[10px]">
				<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">A</div>
				<div className="w-full flex-1 flex flex-col">
					<Link href={`/clubs/${post.clubId}`}>
						<div className="flex justify-between items-center">
							<p className="h-1/2 leading-[20px] font-normal mb-[5px]">{post.club.label}</p>
						</div>
					</Link>
					<p className="h-1/2 text-xs font-light">{post.owner.firstNameTh}</p>
				</div>
				<div className="">
					<Tag tagName={postTypeToLabelPost(post.type)} color={postTypeToColorMap(post.type)} />
				</div>
			</header>
			<h1 className="text-[24px] font-bold">{post.title}</h1>
			<div className="mb-[10px] font-light">
				{truncateText(post.content)}{" "}
				<Link href={`/posts/${post.id}`}>
					<span style={{ color: "#006664", textDecoration: "underline" }}>อ่านเพิ่มเติม</span>
				</Link>
			</div>
			<div className="w-full relative mb-[15px]">
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto", borderRadius: '10px' }}
					alt={"event"}
				/>
			</div>
			<div className="flex gap-2 mb-[10px]">
				<LikeButton isLike={isLike} like={like} unlike={unlike} postId={post.id} type="post" />
				<FaRegComment className="h-5 w-5" />
				<FiSend className="h-5 w-5" />
				{/* <Image src={"/chat.svg"} height={16} width={16} alt={"comment"} /> */}
				{/* <Image src={"/send.svg"} height={16} width={16} alt={"share"} /> */}
			</div>
			<div className="flex justify-between gap-2">
				<p className="h-1/2 font-light text-xs">{likeCount} likes</p>
				<p className="h-1/2 font-light text-xs">{getPreviousTime(post.createdAt)}</p>
			</div>
		</div>
	);
};

export default News;
