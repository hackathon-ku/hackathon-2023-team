"use client";

import Link from "next/link";

type EventBoxProps = {
    eventName: string,
    link: string,
    startDate: string,
    endDate: string,
    location: string
};

export default function EventBox({ eventName, link, startDate, endDate, location }: EventBoxProps) {
	return (
        <Link href={link} className="w-[342px] h-min p-[15px] rounded-[20px] flex flex-col whitespace-nowrap gap-[5px]" style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)' }}>
            <h1 className="text-[24px] font-bold">{eventName}</h1>
            <p>วันเริ่มต้นและสิ้นสุด: {startDate} - {endDate}</p>
            <p className="truncate">สถานที่จัดกิจกรรม: {location}</p>
        </Link>
	);
}