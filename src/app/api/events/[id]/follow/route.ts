import { NextRequest, NextResponse } from "next/server";
import { EventParams } from "../types";
import prisma from "@/lib/prisma";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest, { params }: EventParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	const status = request.nextUrl.searchParams.get("status");

	try {
		let updatedUser;

		if (status === "follow") {
			updatedUser = await prisma.user.update({
				where: { id: session.user.id },
				data: {
					events: {
						connect: { id: parseInt(params.id) },
					},
				},
			});
		} else {
			updatedUser = await prisma.user.update({
				where: { id: session.user.id },
				data: {
					events: {
						disconnect: { id: parseInt(params.id) },
					},
				},
			});
		}

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
