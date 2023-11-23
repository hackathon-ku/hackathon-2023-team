import React from "react";

interface CommentProps {
	name: string;
	message: string;
	createdAt: Date;
}

const Comment: React.FC<CommentProps> = ({ name, message, createdAt }) => {
	return (
		<div className="w-full flex flex-col gap-2 border-b pb-6">
			<div className="flex-1 flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">A</div>
					<div>{name}</div>
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

export default Comment;
