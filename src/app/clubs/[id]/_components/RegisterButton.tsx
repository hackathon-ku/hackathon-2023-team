"use client"
import { useRouter } from "next/navigation";
import React from "react";

interface RegisterButtonProps {
    clubId: string
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ clubId }) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/clubs/${clubId}/members/new`);
    }

	return <button onClick={onClick} className="px-4 py-2 w-fit bg-white/25 rounded-[20px]">สมัครเข้าชมรม</button>;
};

export default RegisterButton;
