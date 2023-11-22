import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import axios from "axios";
import { mockingUserResponse } from "@/app/api/mock-data";

type AuthLoginResponse = {
	user: {
		student: {
			stdId: string;
			titleTh: string;
			titleEn: string;
			firstNameTh: string;
			lastNameTh: string;
			firstNameEn: string;
			lastNameEn: string;
			campusNameTh: string;
			campusNameEn: string;
		};
	};
};

const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(8).max(255),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validation = loginSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(validation.error.format(), { status: 400 });
		}

		// TODO: Request to KU auth login API
		// const response = await axios.post<AuthLoginResponse>(
		// 	`${process.env.KU_SERVER_URL}/auth/login`,
		// 	{
		// 		username: encodeString(body.username),
		// 		password: encodeString(body.password),
		// 	},
		// 	{
		// 		headers: {
		// 			"app-key": process.env.KU_APP_KEY,
		// 		},
		// 	},
		// );
		const response = mockingUserResponse;

		const { stdId, ...userData } = response.data.user.student;
		const updatedUserData = {
			titleTh: userData.titleTh,
			titleEn: userData.titleEn,
			firstNameTh: userData.firstNameTh,
			lastNameTh: userData.lastNameTh,
			firstNameEn: userData.firstNameEn,
			lastNameEn: userData.lastNameEn,
			campusNameTh: userData.campusNameTh,
			campusNameEn: userData.campusNameEn,
		};

		const newUser = await prisma.user.upsert({
			where: { stdId: stdId },
			update: updatedUserData,
			create: { stdId: stdId, ...updatedUserData },
		});

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		return NextResponse.error();
	}
}
