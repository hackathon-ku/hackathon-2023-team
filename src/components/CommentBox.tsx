import React from "react";

interface CommentProps {
	name: string;
	message: string;
	createdAt: Date;
	isYou: boolean;
	firstChar: string;
}

const CommentBox: React.FC<CommentProps> = ({ name, message, createdAt, isYou, firstChar }) => {
	return (
		<div className="w-full flex flex-col gap-2 border-b pb-6">
			<div className="flex-1 flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-[#006664] text-white">
						{firstChar}
					</div>
					<div>{isYou ? "คุณ" : name}</div>
				</div>
				<div>
					{createdAt.toLocaleDateString("th-TH", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</div>
			<p>{message}</p>
		</div>
	);
};

export default CommentBox;
