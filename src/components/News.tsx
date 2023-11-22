import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/th'
interface NewsProps {
	postId: string,
	name: string;
	date: Date;
	postBy: string;
	detail: string;
	img: string;
}

dayjs.extend(relativeTime)
dayjs.locale("th");

const News: React.FC<NewsProps> = ({ postId, name, date, postBy, detail, img }) => {
	const truncateText = (text: string) => (text.length >= 100 ? text.substring(0, 99) + "..." : text);
	const getPreviousTime = (date: Date) => dayjs(date).fromNow();
	return (
		<div className="w-full p-4 border rounded-md shadow-sm">
			<header className="flex items-center gap-2 mb-2">
				<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">A</div>
				<div className="w-full flex-1 flex flex-col">
					<div className="flex justify-between items-center">
						<p className="h-1/2 font-normal">{name}</p>
					</div>
					<p className="h-1/2 text-xs font-light">{postBy}</p>
				</div>
			</header>
			<div className="mb-2">
				{truncateText(
					detail
				)}{" "}
				<Link style={{ color: "#006664", textDecoration: "underline" }} href={`/clubs/posts/${postId}`}>
					Read more
				</Link>
			</div>
			<div className="w-full relative mb-2">
				<Image
					src={img}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
			</div>
			<div className="flex gap-2 mb-2">
				<Image src={"/heart.svg"} height={16} width={16} alt={"like"} />
				<Image src={"/chat.svg"} height={16} width={16} alt={"comment"} />
				<Image src={"/send.svg"} height={16} width={16} alt={"share"} />
			</div>
			<div className="flex justify-between gap-2">
			<p className="h-1/2 font-light text-xs">15 likes</p>
				<p className="h-1/2 font-light text-xs">{getPreviousTime(date)}</p>
			</div>
		</div>
	);
};

export default News;
