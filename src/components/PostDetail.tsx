"use client";

import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { PostIncludeAll } from "@/types/post";
import { FiSend } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import { postTypeToColorMap, postTypeToLabelPost } from "@/lib/post";
import CommentInput from "./CommentInput";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";

type PostDetailProps = {
	post: PostIncludeAll;
};

const PostDetail = ({ post }: PostDetailProps) => {
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

	return (
		<div className="w-full p-8 flex flex-col gap-3">
			<header>
				<div className="flex justify-between font-light text-sm mb-2">
					<span>
						โดย {post.owner.firstNameTh} {post.owner.lastNameTh}
					</span>
					<span>
						{post.createdAt.toLocaleDateString("th-TH", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
				<span className="text-2xl font-bold">{post.title}</span>
			</header>
			<section className="flex flex-col gap-2">
				<Tag tagName={postTypeToLabelPost(post.type)} color={postTypeToColorMap(post.type)} />
				<p className="font-light">{post.content}</p>
				<div className="flex gap-2">
					<LikeButton isLike={isLike} like={like} unlike={unlike} postId={post.id} type="post" />
					<FiSend className="h-5 w-5" />
				</div>
				{likeCount > 0 && <p className="font-light text-sm">{likeCount} likes</p>}
				<CommentInput type={"post"} postId={post.id} />
			</section>
		</div>
	);
};

export default PostDetail;
