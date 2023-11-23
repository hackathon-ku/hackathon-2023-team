"use client";

import { Button } from "@mantine/core";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type FollowClubButtonProps = {
	role?: Role;
	clubId: number;
	isFollowing: boolean;
};

export default function FollowClubButton({ role, clubId, isFollowing }: FollowClubButtonProps) {
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

	console.log(role);
	if (role === Role.PRESIDENT || role === Role.VICE_PRESIDENT) {
		return (
			<Button
				variant="filled"
				size="xs"
				radius="xl"
				style={{ border: "1px solid #fff", backgroundColor: "#006664", color: "#fff", fontWeight: "400" }}
			>
				แก้ไข
			</Button>
		);
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
