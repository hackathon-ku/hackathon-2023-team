"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchProps = {
	type: "clubs" | "events";
	placeholder: string;
};

export default function Search({ type, placeholder }: SearchProps) {
	const router = useRouter();
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!search) {
			router.push(`/${type}`);
		} else {
			router.push(`/${type}?q=${search}`);
		}
	}, [type, search, router]);

	return (
		<div>
			<input type="text" value={search} placeholder={placeholder} className="w-full border border-1 py-[9px] px-[15px] rounded-[20px]" onChange={(e) => setSearch(e.target.value)} />
		</div>
	);
}
