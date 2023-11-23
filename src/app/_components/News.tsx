"use client";

import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import { PostType, Role } from "@prisma/client";
import Tag from "@/components/Tag";
import Link from "next/link";
import { PostInclude } from "@/app/page";
import LikeButton from "@/components/LikeButton";
import { ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import axios from "axios";
import { postTypeToColorMap, postTypeToLabelPost } from "@/lib/post";
import CustomModal from "@/components/CustomModal";
interface NewsProps {
	post: PostInclude;
	role?: Role;
}

const canApprove = (role?: Role) => {
	if (!role) {
		return false;
	}
	return role === Role.PRESIDENT || role === Role.VICE_PRESIDENT;
};

dayjs.extend(relativeTime);
dayjs.locale("th");

const News: React.FC<NewsProps> = ({ post, role }) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	const [likeCount, setLikeCount] = useState<number>(post.likes.length);
	const [isLike, setIsLike] = useState<boolean>(
		isAuthenticated ? post.likes.some((like) => like.userId === session.data.user.id) : false,
	);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (isAuthenticated) {
			setIsLike(post.likes.some((like) => like.userId === session.data.user.id));
		} else {
			setIsLike(false);
		}
	}, [isAuthenticated, session, post]);

	const like = async (postId: number) => {
		if (!isAuthenticated) {
			alert("กรุณาเข้าสู่ระบบ");
			return;
		}

		try {
			await axios.post(`/api/posts/${postId}/like`);
			setIsLike((prev) => !prev);
			setLikeCount((prev) => prev + 1);
		} catch (error) {
			console.error("Post like failed: ", error);
		}
	};
	const unlike = async (postId: number) => {
		if (!isAuthenticated) {
			alert("กรุณาเข้าสู่ระบบ");
			return;
		}

		try {
			await axios.delete(`/api/posts/${postId}/like`);
			setIsLike((prev) => !prev);
			setLikeCount((prev) => prev - 1);
		} catch (error) {
			console.error("Unlike failed: ", error);
		}
	};

	const truncateText = (text: string) => (text.length >= 100 ? text.substring(0, 99) + "..." : text);
	const getPreviousTime = (date: Date) => dayjs(date).fromNow();

	return (
		<div className="w-full p-4 border rounded-md shadow-sm">
			<header className="flex items-center gap-2 mb-4">
				<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">A</div>
				<div className="w-full flex-1 flex flex-col">
					<Link href={`/clubs/${post.clubId}`}>
						<div className="flex justify-between items-center">
							<p className="h-1/2 font-normal">{post.club.label}</p>
						</div>
					</Link>
					<p className="h-1/2 text-xs font-light">{post.owner.firstNameTh}</p>
				</div>
				<div className="">
					<Tag tagName={postTypeToLabelPost(post.type)} color={postTypeToColorMap(post.type)} />
				</div>
			</header>
			<div className="mb-2">
				{truncateText(post.content)}{" "}
				<Link href={`/posts/${post.id}`}>
					<span style={{ color: "#006664", textDecoration: "underline" }}>อ่านเพิ่มเติม</span>
				</Link>
			</div>
			<div className="w-full relative mb-2">
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
			</div>
			{!post.approved && canApprove(role) ? (
				<div>
					<div className="flex gap-1 mb-2">
						<LikeButton
							isLike={isLike}
							like={() => like(post.id)}
							unlike={() => unlike(post.id)}
							postId={0}
							type={"post"}
						/>
						<ChatBubbleOvalLeftIcon className="h-5 w-5" />
						<PaperAirplaneIcon className="h-5 w-5" />
						{/* <Image src={"/chat.svg"} height={16} width={16} alt={"comment"} /> */}
						{/* <Image src={"/send.svg"} height={16} width={16} alt={"share"} /> */}
					</div>
					<div className="flex justify-between gap-2">
						<p className="h-1/2 font-light text-xs">{likeCount} likes</p>
						<p className="h-1/2 font-light text-xs">{getPreviousTime(post.createdAt)}</p>
					</div>
				</div>
			) : (
				<div className="flex flex-row">
					<button className="block text-sm text-white py-1 px-4 border mr-1 bg-[#006664] rounded-full">อนุมัติ</button>
					<button className="block text-sm text-[#F24B4B] py-1 px-4 border border-[#F24B4B] rounded-full">
						ปฏิเสธ
					</button>
				</div>
			)}
		</div>
	);
};

export default News;
