"use client";

import Link from "next/link";
import PostSelector from "./PostSelector";
import Image from "next/image";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createEventSchema } from "@/app/validator";
import { PostType } from "@/types/post";
import { useState } from "react";
import { useRouter } from "next/navigation";

const eventFormSchema = createEventSchema.omit({ clubId: true });
type EventForm = z.infer<typeof eventFormSchema>;

type PostFormProps = {
	clubId: number;
};

export default function PostForm({ clubId }: PostFormProps) {
	const router = useRouter();
	const [postType, setPostType] = useState<PostType>("normal_post");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EventForm>({
		resolver: zodResolver(eventFormSchema),
	});

	const onSubmit: SubmitHandler<EventForm> = async (data) => {
		const path = postType === "event" ? "events" : "posts";
		try {
			const res = await axios.post("/api/events", { ...data, clubId });
			router.push(`/clubs/${clubId}/${path}`);
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};

	function onPostTypeChange(value: PostType) {
		setPostType(value);
	}

	return (
		<div className="px-6 py-4">
			<div className="flex justify-between">
				<div className="flex items-center">
					<h1 className="text-2xl font-bold">สร้างโพสต์ใหม่</h1>
					<div className="w-28 ml-2.5">
						<PostSelector value={postType} onChange={onPostTypeChange} />
					</div>
				</div>
				<Link href={`/clubs/${clubId}`}>
					<Image src="/icons/close.svg" alt="close" width={12} height={12} />
				</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="my-3 flex flex-col justify-between">
				<div className="flex flex-col">
					<input
						type="text"
						placeholder="หัวข้อ"
						{...register("title")}
						className="text-2xl font-bold w-full focus:outline-none"
					/>
					<textarea
						cols={30}
						rows={10}
						placeholder="เนื้อหา"
						{...register("content")}
						className="w-full my-2 focus:outline-none"
					/>
					<input
						type="text"
						placeholder="สถานที่จัดงาน"
						{...register("location")}
						className="w-full focus:outline-none"
					/>
					<input type="date" {...register("startDate")} />
					<input type="date" {...register("endDate")} />
					<input type="time" {...register("startTime")} />
					<input type="time" {...register("endTime")} />
				</div>
				<div className="flex items-center justify-between mt-2">
					<label htmlFor="file-upload" className="custom-file-upload">
						เพิ่มรูปภาพ
					</label>
					<input id="file-upload" type="file" accept="image/jpeg, image/png" className="hidden" />
					<button type="submit" className="bg-inherit text-[#006664] border border-[#006664] px-4 py-1 rounded-full">
						สร้างโพสต์
					</button>
				</div>
			</form>
		</div>
	);
}
