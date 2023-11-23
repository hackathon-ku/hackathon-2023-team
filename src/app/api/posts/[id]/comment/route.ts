import { NextRequest, NextResponse } from "next/server";
import { PostParams } from "../types";
import { z } from "zod";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

const createCommentSchema = z.object({
	message: z.string().min(1).max(1000),
	type: z.enum(["event", "post"]),
});

export async function POST(request: NextRequest, { params }: PostParams) {
	const body = await request.json();

	const validator = createCommentSchema.safeParse(body);
	if (!validator.success) {
		return NextResponse.json("กรุณากรอกข้อมูลให้ถูกต้อง", { status: 400 });
	}
	const { type, message } = validator.data;

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	try {
		const newComment = await prisma.comment.create({
			data: {
				message: message,
				userId: session.user.id,
				postId: type === "post" ? parseInt(params.id) : undefined,
				eventId: type === "event" ? parseInt(params.id) : undefined,
			},
		});

		return NextResponse.json(newComment, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
