"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	if (pathname.includes("login")) {
		return null;
	}

	return (
		<nav className="bg-white w-full flex items-center justify-between h-16 px-4 text-[#006664]">
			<Image alt="chomromku" src="/logo.svg" width="0" height="0" sizes="10vw" className="h-8 w-auto" />
			<ul className="flex flex-row items-center gap-x-3">
				<li>
					<Link href="https://google.com" className="block text-sm" aria-current="page">
						ชมรมทั้งหมด
					</Link>
				</li>
				<li>
					<Link href="/login" className="block text-sm py-1 px-4 border border-[#006664] rounded-full">
						Sign in
					</Link>
				</li>
			</ul>
		</nav>
	);
}
