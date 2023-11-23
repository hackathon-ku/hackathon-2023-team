import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { PostFormType } from "@/types/post";
import { PostParams } from "../types";
import { z } from "zod";

const approvePostSchema = z.object({
	clubId: z.number(),
});

export async function POST(request: NextRequest, { params }: PostParams) {
	const postType = request.nextUrl.searchParams.get("type") as PostFormType;
	const body = await request.json();

	const validation = approvePostSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ถูกต้อง" }, { status: 400 });
	}

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "คุณจำเป็นต้องเข้าสู่ระบบก่อน" }, { status: 401 });
	}

	const member = await prisma.member.findUnique({
		where: { userId: session.user.id, clubId: validation.data.clubId },
	});
	if (!member) {
		return NextResponse.json({ error: "คุณไม่ใช่สมาชิกของชมรมนี้" }, { status: 403 });
	}

	if (member.role !== Role.PRESIDENT && member.role !== Role.VICE_PRESIDENT) {
		return NextResponse.json({ error: "คุณไม่ใช่หัวหน้าหรือรองหัวหน้าของชมรมนี้" }, { status: 403 });
	}

	if (postType === "event") {
		const updatedEvent = await prisma.event.update({
			where: { id: parseInt(params.id) },
			data: {
				approved: true,
			},
		});

		return NextResponse.json(
			{ message: `Approve event with id: ${params.id} completed`, ...updatedEvent },
			{ status: 200 },
		);
	} else {
		const updatedPost = await prisma.post.update({
			where: { id: parseInt(params.id) },
			data: {
				approved: true,
			},
		});

		return NextResponse.json(
			{ message: `Approve post with id: ${params.id} completed`, ...updatedPost },
			{ status: 200 },
		);
	}
}
