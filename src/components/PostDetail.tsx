"use client";

import React from "react";
import Tag from "./Tag";
import { PostIncludeAll } from "@/types/post";
import { FiHeart, FiSend } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import { postTypeToColorMap, postTypeToLabelPost } from "@/lib/post";
import CommentInput from "./CommentInput";

type PostDetailProps = {
	post: PostIncludeAll;
};

const PostDetail = ({ post }: PostDetailProps) => {
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
			<section className="flex flex-col gap-4">
				<Tag tagName={postTypeToLabelPost(post.type)} color={postTypeToColorMap(post.type)} />
				<p className="font-light">{post.content}</p>
				<div className="flex gap-2">
					{/* <LikeButton isLike={} /> */}
					<FiHeart className="h-5 w-5" />
					<FaRegComment className="h-5 w-5" />
					<FiSend className="h-5 w-5" />
				</div>
				<CommentInput type={"post"} postId={post.id} />
			</section>
		</div>
	);
};

export default PostDetail;
