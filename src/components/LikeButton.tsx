"use client";

import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

type LikeButtonProps = {
	isLike: boolean;
	like: () => void;
	unlike: () => void;
	postId: number;
	type: "event" | "post";
};

export default function LikeButton({ isLike, like, unlike, postId, type }: LikeButtonProps) {
	const { status } = useSession();

	async function handleClickLike() {
		if (status !== "authenticated") {
			alert("กรุณาเข้าสู่ระบบ");
			return;
		}

		try {
			await axios.post(`/api/posts/${postId}/like`, {
				type,
			});
			like();
		} catch (error) {
			console.error("Post like failed: ", error);
		}
	}

	async function handleClickUnlike() {
		if (status !== "authenticated") {
			alert("กรุณาเข้าสู่ระบบ");
			return;
		}

		try {
			await axios.delete(`/api/posts/${postId}/like?type=${type}`);
			unlike();
		} catch (error) {
			console.error("Unlike failed: ", error);
		}
	}

	if (isLike) {
		return <FaHeart className="h-5 w-5 cursor-pointer text-red-500" onClick={handleClickUnlike} />;
	}

	return <FiHeart className="h-5 w-5 cursor-pointer" onClick={handleClickLike} />;
}
