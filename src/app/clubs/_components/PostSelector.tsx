"use client";

import { PostFormType } from "@/types/post";
import { Select } from "@mantine/core";
import Image from "next/image";

const getPostBadge = (postFormType: PostFormType) => {
	switch (postFormType) {
		case "normal_post":
			return "#28C3D7";
		case "news":
			return "#03A96B";
		case "qna":
			return "#F2914B";
		case "event":
			return "#F24B4B";
		default:
			return "";
	}
};

type PostSelectorProps = {
	value: PostFormType;
	onChange: (value: PostFormType) => void;
};

export default function PostSelector({ value, onChange }: PostSelectorProps) {
	return (
		<Select
			styles={{
				input: {
					backgroundColor: getPostBadge(value),
					color: "white",
					padding: "0 10px",
					fontSize: "14px",
					minHeight: "0",
					height: "24px",
					fontFamily: `'__Prompt_2d0d9b', '__Prompt_Fallback_2d0d9b'`,
				},
				dropdown: {
					borderRadius: "20px",
				},
			}}
			rightSection={<Image src="/icons/arrow-down.svg" alt="chevron-down" width={9} height={9} />}
			variant="filled"
			radius="xl"
			data={[
				{ value: "normal_post", label: "โพสต์ทั่วไป" },
				{ value: "news", label: "ข่าวสาร" },
				{ value: "qna", label: "Q&A" },
				{ value: "event", label: "อีเว้นท์" },
			]}
			defaultValue="normal_post"
			allowDeselect={false}
			withCheckIcon={false}
			onChange={(value) => onChange(value as PostFormType)}
		/>
	);
}
