import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { PostFormType } from "@/types/post";

export async function POST(request: NextRequest) {
	const postType = request.nextUrl.searchParams.get("type") as PostFormType;
	const body = await request.json();

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "คุณจำเป็นต้องเข้าสู่ระบบก่อน" }, { status: 401 });
	}

	const member = await prisma.member.findUnique({ where: { userId: session.user.id, clubId: body.clubId } });
	if (!member) {
		return NextResponse.json({ error: "คุณไม่ใช่สมาชิกของชมรมนี้" }, { status: 403 });
	}

	if (member.role !== Role.PRESIDENT && member.role !== Role.VICE_PRESIDENT) {
		return NextResponse.json({ error: "คุณไม่ใช่หัวหน้าหรือรองหัวหน้าของชมรมนี้" }, { status: 403 });
	}

	if (postType === "event") {
		const updatedEvent = await prisma.event.update({
			where: { id: body.postId },
			data: {
				approved: true,
			},
		});

		return NextResponse.json(
			{ message: `Approve event with id: ${body.postId} completed`, ...updatedEvent },
			{ status: 200 },
		);
	}

	const updatedPost = await prisma.post.update({
		where: { id: body.postId },
		data: {
			approved: true,
		},
	});

	return NextResponse.json(
		{ message: `Approve event with id: ${body.postId} completed`, ...updatedPost },
		{ status: 200 },
	);
}
