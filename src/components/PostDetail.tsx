import React from "react";
import Tag from "./Tag";
import Image from "next/image";

const PostDetail = () => {
	return (
		<div className="w-full p-8 flex flex-col gap-3">
			<header>
				<div className="flex justify-between font-light text-sm mb-2">
					<span>โดย ใครเอ่ย</span>
					<span>15 พ.ย. 66</span>
				</div>
				<span className="text-2xl font-bold">ชมรมดนตรีสากลมหาวิทยาลัย เกษตรศาสตร์ (เค ยู แบนด์)</span>
			</header>
			<section className="flex flex-col gap-4">
				<Tag tagName={"news"} color={"bg-[#03A96B]"} />
				<p className="font-light">
					และแล้ว...งานสุดท้ายของพวกเราในปีการศึกษานี้ก็ได้จบลงไปแล้วกับงาน Creative Village
					ขอบคุณทุกคนที่มาดูพวกเราแสดงเมื่อวานนี้นะคะ ขอบคุณทุกคนที่มาร่วมเป็น ส่วนหนึ่งที่ทำให้ปีที่ 30
					ของชมรมเต็มไปด้วยความทรงจำดี ๆ มากมาย และสุดท้ายนี้ ขอฝาก KU Chorus ไว้ในใจของทุกคนในปีต่อ ๆ ไป
					และสนับสนุนพวกเราตลอดไปเล้ย~
				</p>
				<div className="flex gap-2">
					<Image src={"/heart.svg"} height={16} width={16} alt={"like"} />
					<Image src={"/chat.svg"} height={16} width={16} alt={"comment"} />
					<Image src={"/send.svg"} height={16} width={16} alt={"share"} />
				</div>
			</section>
		</div>
	);
};

export default PostDetail;
