import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsProps {
    name: string,
    date: Date,
    postBy: string,
    detail: string,
    img: string
}

const News = () => {
	const truncateText = (text: string) => (text.length >= 100 ? text.substring(0, 99) + "..." : text);

	return (
		<div className="w-full p-4 border rounded-md shadow-sm">
			<header className="flex items-center gap-2 mb-2">
				<div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">A</div>
				<div className="w-full flex-1 flex flex-col">
					<div className="flex justify-between items-center">
						<p className="h-1/2 font-normal">ชื่อชมรม</p>
						<p className="h-1/2 font-light text-xs">2 วันที่แล้ว</p>
					</div>
					<p className="h-1/2 text-xs font-light">โดยใครเอ่ย</p>
				</div>
			</header>
			<div className="mb-2">
				{truncateText(
					"และแล้ว...งานสุดท้ายของพวกเราในปีการศึกษานี้ก็ได้จบลงไปแล้วกับงาน Creative Village ขอบคุณทุกคนที่มาดูพวกเราแสดงเมื่อวานนี้นะคะ",
				)}{" "}
				<Link style={{ color: "#006664", textDecoration: "underline" }} href={"/signin"}>
					Read more
				</Link>
			</div>
			<div className="w-full relative">
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
			</div>
		</div>
	);
};

export default News;
