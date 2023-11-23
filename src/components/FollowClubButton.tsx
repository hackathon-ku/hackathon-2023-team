"use client";

import { Button } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";

type FollowClubButtonProps = {
	clubId: number;
	isFollowing: boolean;
};

export default function FollowClubButton({ clubId, isFollowing }: FollowClubButtonProps) {
	const router = useRouter();

	async function handleClick() {
		const status = isFollowing ? "unfollow" : "follow";
		try {
			const res = await axios.post(`/api/clubs/${clubId}/follow?status=${status}`);
			router.refresh();
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Button
			variant="filled"
			size="xs"
			radius="xl"
			style={{ border: "1px solid #fff", backgroundColor: "#006664", color: "#fff", fontWeight: "400" }}
			onClick={handleClick}
		>
			{isFollowing ? "เลิกติดตาม" : "ติดตาม"}
		</Button>
	);
}
