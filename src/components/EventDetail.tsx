"use client";

import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { FiSend } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import CommentInput from "./CommentInput";
import { EventIncludeAll } from "@/types/event";
import FollowEventButton from "./FollowEventButton";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";

type EventDetailProps = {
	event: EventIncludeAll;
};

const EventDetail = ({ event }: EventDetailProps) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	const [likeCount, setLikeCount] = useState<number>(event.likes.length);
	const [isLike, setIsLike] = useState<boolean>(
		isAuthenticated ? event.likes.some((like) => like.userId === session.data.user.id) : false,
	);

	useEffect(() => {
		if (isAuthenticated) {
			setIsLike(event.likes.some((like) => like.userId === session.data.user.id));
		} else {
			setIsLike(false);
		}
	}, [isAuthenticated, session, event]);

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
						โดย {event.owner.user.firstNameTh} {event.owner.user.lastNameTh}
					</span>
					<span>
						{event.createdAt.toLocaleDateString("th-TH", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
				<span className="text-2xl font-bold">{event.title}</span>
			</header>
			<section className="flex flex-col gap-4">
				<Tag tagName={"อีเว้นท์"} color={"bg-[#F24B4B]"} />
				<p className="font-light">{event.content}</p>
				<div className="flex items-center justify-between">
					<div className="flex gap-2">
						<LikeButton isLike={isLike} like={like} unlike={unlike} postId={event.id} type="event" />
						<FaRegComment className="h-5 w-5" />
						<FiSend className="h-5 w-5" />
					</div>
					<FollowEventButton
						eventId={event.id}
						isFollowing={event.followers.some((f) => f.id === session.data?.user.id)}
					/>
				</div>
				{likeCount > 0 && <p className="font-light text-sm">{likeCount} likes</p>}
				<CommentInput type={"event"} postId={event.id} />
			</section>
		</div>
	);
};

export default EventDetail;
