"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(8).max(255),
});

export default function SignIn() {
	const [formData, setFormData] = useState<LoginForm>({
		username: "",
		password: "",
	});
	const [isFormError, setIsFormError] = useState<boolean>(false);

	const onSubmit = () => {
		const validation = loginSchema.safeParse(formData);

		if (!validation.success) {
			setIsFormError(true);
		}
		else {
			signIn("credentials", { ...formData, callbackUrl: '/events'});
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-12 bg-white gap-8">
			<div className="min-h-[50%] min-w-[50%]">
				<Image alt="chomromku" src="/logo.svg" width="0" height="0" sizes="100vw" className="w-full h-auto" />
			</div>
			<div className="w-full flex flex-col items-start justify-start gap-2">
				<label className="font-bold">บัญชีผู้ใช้เครือข่ายนนทรี</label>
				<input
					className="w-full mb-1 rounded-full py-1.5 px-3 border border-gray-100 text-sm placeholder:text-sm"
					placeholder="เช่น b63xxxxxxxx หรือ regxxx"
					onChange={(e) => setFormData({ ...formData, username: e.target.value})}
				></input>
				<label className="font-bold">รหัสผ่าน</label>
				<input
					className="w-full rounded-full py-1.5 px-3 border border-gray-100 placeholder:text-sm"
					placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
					type="password"
					onChange={(e) => setFormData({ ...formData, password: e.target.value})}
				></input>
			</div>
			{isFormError ? <p className="text-red-400">บัญชีผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง</p> : <></>}
			<button
				onClick={onSubmit}
				className="rounded-full py-1.5 px-6 bg-[#006664] text-white text-sm"
			>
				เข้าสู่ระบบ
			</button>
		</main>
	);
}

type LoginForm = Record<"username" | "password", string>;
