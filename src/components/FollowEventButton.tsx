"use client";

import { Button } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";

type FollowEventButtonProps = {
	eventId: number;
	isFollowing: boolean;
};

export default function FollowEventButton({ eventId, isFollowing }: FollowEventButtonProps) {
	const router = useRouter();

	async function handleClick() {
		const status = isFollowing ? "unfollow" : "follow";
		try {
			await axios.post(`/api/events/${eventId}/follow?status=${status}`);
			router.refresh();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Button
			variant="default"
			size="xs"
			radius="xl"
			style={{ border: "1px solid #006664", color: "#006664", fontWeight: "400" }}
			onClick={handleClick}
		>
			{isFollowing ? "เลิกติดตามอีเว้นท์นี้" : "ติดตามอีเว้นท์นี้"}
		</Button>
	);
}
