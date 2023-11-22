"use client";

import Link from "next/link";

type ClubBoxProps = {
    clubName: string,
};

export default function ClubBox({ clubName }: ClubBoxProps) {
	return (
        <Link href={'#'} className="p-[15px] rounded-[20px]" style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)' }}>{clubName}</Link>
	);
}
