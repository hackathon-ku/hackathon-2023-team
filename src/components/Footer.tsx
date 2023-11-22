"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-[#B2BB1E] w-full flex flex-col items-center justify-center text-sm text-white h-24">
			<p>ติดต่อเรา</p>
			<div className="flex my-1.5 gap-x-2.5">
				<Image alt="github" src="/icons/github.svg" width="17" height="17" />
				<Image alt="line" src="/icons/line.svg" width="20" height="20" />
				<Image alt="facebook" src="/icons/facebook.svg" width="16" height="16" />
				<Image alt="instagram" src="/icons/instagram.svg" width="16" height="16" />
			</div>
			<Link href="https://google.com" className="text-xs underline">
				รายงานปัญหา
			</Link>
		</footer>
	);
}
