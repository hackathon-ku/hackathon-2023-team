"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MembersProps = {
    name : string
};

export default function Members_box( {name}: MembersProps) {
	return (
        <p className="border rounded-[20px] p-[15px]" style={{boxShadow:"0px 0px 20px 0px rgba(0, 0, 0, 0.10)"}}>{name}</p>
	);
}
