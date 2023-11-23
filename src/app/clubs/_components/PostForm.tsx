"use client";

import Link from "next/link";
import PostSelector from "./PostSelector";
import Image from "next/image";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createPostSchema, createEventSchema } from "@/app/validator";
import { PostFormType } from "@/types/post";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Group } from "@mantine/core";
import { DatePickerInput, TimeInput } from "react-hook-form-mantine";
import { Member, Prisma, Role } from "@prisma/client";

const postFormSchema = z
	.object({
		...createEventSchema.partial().shape,
		...createPostSchema.shape,
	})
	.omit({ clubId: true });
type PostForm = z.infer<typeof postFormSchema>;

type PostFormProps = {
	clubId: number;
	member?: Member | null;
};

export default function PostForm({ clubId, member }: PostFormProps) {
	const router = useRouter();
	const [postType, setPostType] = useState<PostFormType>("normal_post");
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostForm>({
		resolver: zodResolver(postFormSchema),
	});

	const onSubmit: SubmitHandler<PostForm> = async (data) => {
		try {
			await axios.post(`/api/posts?type=${postType}`, { ...data, clubId });
			router.push(`/clubs/${clubId}`);
		} catch (error) {
			console.error(error);
		}
	};

	function onPostTypeChange(value: PostFormType) {
		setPostType(value);
	}

	return (
		<div className="px-6 py-4">
			<div className="flex justify-between">
				<div className="flex items-center">
					<h1 className="text-2xl font-bold">สร้างโพสต์ใหม่</h1>
					<div className="w-28 ml-2.5">
						<PostSelector role={member ? member.role : null} value={postType} onChange={onPostTypeChange} />
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
					{postType === "event" && (
						<div className="text-sm">
							<Fragment>
								<Group className="pb-1">
									วันเริ่มต้นและสิ้นสุด:
									<DatePickerInput control={control} name={"startDate"} placeholder="วันเริ่มต้น" variant="unstyled" />
									-
									<DatePickerInput
										control={control}
										name={"endDate"}
										placeholder="วันสิ้นสุด"
										style={{ fontFamily: `'__Prompt_2d0d9b', '__Prompt_Fallback_2d0d9b'` }}
										variant="unstyled"
									/>
								</Group>
								<Group className="pb-1">
									ช่วงเวลา:
									<TimeInput control={control} name={"startTime"} variant="unstyled" /> -
									<TimeInput control={control} name={"endTime"} variant="unstyled" />
								</Group>
								<Group className="pb-1">
									สถานที่จัดกิจกรรม:
									<input
										type="text"
										placeholder="สถานที่จัดงาน"
										{...register("location")}
										className="focus:outline-none"
									/>
								</Group>
							</Fragment>
						</div>
					)}
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
