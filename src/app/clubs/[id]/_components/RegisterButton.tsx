"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

interface RegisterButtonProps {
	clubId: number;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ clubId }) => {
	const router = useRouter();

	const onClick = () => {
		router.push(`/clubs/${clubId}/members/new`);
	};

	return (
		<Button
			variant="filled"
			size="xs"
			radius="xl"
			style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#fff", fontWeight: "400" }}
			onClick={onClick}
		>
			สมัครเข้าชมรม
		</Button>
	);
};

export default RegisterButton;
