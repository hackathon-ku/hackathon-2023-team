"use client";
import { Button } from "@mantine/core";
import { Member, Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface RegisterButtonProps {
	member: Member | null;
	clubId: number;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ member, clubId }) => {
	const router = useRouter();

	const onClick = (path: string) => {
		router.push(`/clubs/${clubId}/members/${path}`);
	};

	if (!member) {
		return (
			<Button
				variant="filled"
				size="xs"
				radius="xl"
				style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#fff", fontWeight: "400" }}
				onClick={() => onClick("new")}
			>
				สมัครเข้าชมรม
			</Button>
		);
	}

	if (member.role === Role.PRESIDENT || member.role === Role.VICE_PRESIDENT) {
		return (
			<Button
				variant="filled"
				size="xs"
				radius="xl"
				style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#fff", fontWeight: "400" }}
				onClick={() => onClick("requested")}
			>
				ผู้สมัครเข้าชมรม
			</Button>
		);
	}

	return null;
};

export default RegisterButton;
