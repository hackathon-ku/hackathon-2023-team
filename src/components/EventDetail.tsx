"use client";

import React from "react";
import Tag from "./Tag";
import { FiHeart, FiSend } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa6";
import CommentInput from "./CommentInput";
import { EventIncludeAll } from "@/types/event";
import FollowEventButton from "./FollowEventButton";

type EventDetailProps = {
	event: EventIncludeAll;
};

const EventDetail = ({ event }: EventDetailProps) => {
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
						{/* <LikeButton isLike={} /> */}
						<FiHeart className="h-5 w-5" />
						<FaRegComment className="h-5 w-5" />
						<FiSend className="h-5 w-5" />
					</div>
					<FollowEventButton />
					{/* <button>ติดตามอีเว้นท์นี้</button> */}
				</div>
				<CommentInput type={"event"} postId={event.id} />
			</section>
		</div>
	);
};

export default EventDetail;
