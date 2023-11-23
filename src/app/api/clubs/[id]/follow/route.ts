import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ClubParams } from "../types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: ClubParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อน" }, { status: 401 });
	}

	const status = request.nextUrl.searchParams.get("status");

	try {
		let updatedUser;

		if (status === "follow") {
			updatedUser = await prisma.user.update({
				where: { id: session.user.id },
				data: {
					clubs: {
						connect: { id: parseInt(params.id) },
					},
				},
			});
		} else {
			updatedUser = await prisma.user.update({
				where: { id: session.user.id },
				data: {
					clubs: {
						disconnect: { id: parseInt(params.id) },
					},
				},
			});
		}

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}

	// return
}
