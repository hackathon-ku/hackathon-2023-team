"use client";

"use client";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

type LikeButtonProps = {
	isLike: boolean;
	like: () => void;
	unlike: () => void;
};

export default function LikeButton({ isLike, like, unlike }: LikeButtonProps) {
	if (isLike) {
		return <HeartIconSolid className="h-5 w-5 cursor-pointer text-red-500" onClick={unlike} />;
	}

	return <HeartIconOutline className="h-5 w-5 cursor-pointer" onClick={like} />;
}
