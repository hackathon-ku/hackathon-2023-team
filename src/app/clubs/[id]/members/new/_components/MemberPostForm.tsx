"use client";

import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal } from "@mantine/core";
import { User } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { registerMemberData } from "@/app/api/mock-data";

const postFormSchema = z.object({
	year: z.number().min(1).max(6),
	faculty: z.string().min(1),
	department: z.string().min(1),
	email: z.string().min(1),
	phone: z.string().min(1),
	reason: z.string().min(1),
});

type PostForm = z.infer<typeof postFormSchema>;

type PostFormProps = {
	user: User;
	clubId: string;
};

export default function MemberPostForm({ user, clubId }: PostFormProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const router = useRouter();
	const { data } = registerMemberData

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostForm>({
		resolver: zodResolver(postFormSchema),
	});

	const onSubmit = async () => {
		try {
			const res = await axios.post(`/api/clubs/${clubId}/members`);
            console.log(res)
            router.push(`/clubs/${clubId}`)
		} catch (error) {
			console.error("Failed when create member: ", error);
		}
	};

	return (
		<div className="px-6 py-4">
			<div className="flex justify-between mb-2">
				<div className="flex items-center">
					<h1 className="text-2xl font-bold">ใบสมัครเข้าสมาชิกชมรม</h1>
				</div>
				<Link href={`/clubs/${clubId}/members`}>
					<Image src="/icons/close.svg" alt="close" width={12} height={12} />
				</Link>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="my-3 flex flex-col justify-between">
				<div className="flex flex-col gap-2">
					<label>ชั้นปี</label>
					<input defaultValue={data.user.year} {...register("year")} className="w-full border-b" />
					<label>คณะ</label>
					<input defaultValue={data.user.faculty} {...register("faculty")} className="w-full border-b" />
					<label>สาขา</label>
					<input defaultValue={data.user.department} {...register("department")} className="w-full border-b" />
					<label>Email</label>
					<input defaultValue={data.user.email} {...register("email")} className="w-full border-b" />
					<label>เบอร์ที่สามารถติดต่อได้</label>
					<input defaultValue={data.user.phone} {...register("phone")} className="w-full border-b" />
					<label>เหตุผลที่อยากเข้าร่วม</label>
					<input defaultValue={data.user.reason} {...register("reason")} className="w-full border-b mb-4" />
					<button
						className="self-end   w-32 bg-inherit text-[#006664] border border-[#006664] px-4 py-1 rounded-full"
						onClick={open}
					>
						สมัคร
					</button>
					<Modal centered opened={opened} onClose={close} withCloseButton={false}>
						<p className="font-light mb-2">คุณตกลงส่งใบสมัครเข้าเป็นสมาชิกชมรม ใช่หรือไม่</p>
						<div className="flex gap-2 items-center justify-center">
							<button
								onClick={onSubmit}
								className="py-2 px-4 rounded-full bg-[#006664] text-white"
							>
								ตกลง
							</button>
							<button
								type="submit"
								onClick={close}
								className="py-2 px-4 rounded-full border border-[#F24B4B] text-[#F24B4B]"
							>
								ยกเลิก
							</button>
						</div>
					</Modal>
				</div>
			</form>
		</div>
	);
}
