"use client";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const pathname = usePathname();
	const { status, data } = useSession();
	const [isUserTabOpen, setIsUserTabOpen] = useState(false);

	if (pathname.includes("login")) {
		return null;
	}

	return (
		<nav className="bg-white w-full flex items-center justify-between h-16 px-4 text-[#006664] relative">
			<Link href="/">
				<Image alt="chomromku" src="/logo.svg" width="0" height="0" sizes="10vw" className="h-8 w-auto" />
			</Link>
			<ul className="flex flex-row items-center gap-x-3">
				<li>
					<Link href="/clubs" className="block text-sm" aria-current="page">
						ชมรมทั้งหมด
					</Link>
				</li>
				{status === "authenticated" ? (
					<li
						onClick={() => setIsUserTabOpen((prev) => !prev)}
						className="bg-[#006664] w-8 h-8 flex items-center justify-center rounded-full"
					>
						<span className="text-white">{data.user.firstNameEn[0]}</span>
					</li>
				) : (
					<li>
						<Link href="/login" className="block text-sm py-1 px-4 border border-[#006664] rounded-full">
							Sign in
						</Link>
					</li>
				)}
			</ul>
			{isUserTabOpen && (
				<div
					onClick={() => signOut()}
					className="cursor-pointer bg-slate-100 rounded absolute -bottom-5 shadow right-4 z-10"
				>
					<span className="p-4 rounded">ออกจากระบบ</span>
				</div>
			)}
		</nav>
	);
}
