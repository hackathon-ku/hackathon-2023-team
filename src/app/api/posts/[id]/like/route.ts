import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import type { PostParams } from "../types";
import { z } from "zod";

const createLikeSchema = z.object({
	type: z.enum(["event", "post"]),
});

export async function POST(request: NextRequest, { params }: PostParams) {
	const body = await request.json();

	const validator = createLikeSchema.safeParse(body);
	if (!validator.success) {
		return NextResponse.json("กรุณากรอกข้อมูลให้ถูกต้อง", { status: 400 });
	}

	const { type } = validator.data;

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	try {
		const newLike = await prisma.like.create({
			data: {
				userId: session.user.id,
				postId: type === "post" ? parseInt(params.id) : undefined,
				eventId: type === "event" ? parseInt(params.id) : undefined,
			},
		});
		return NextResponse.json(newLike, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: PostParams) {
	const type = request.nextUrl.searchParams.get("type");

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	try {
		let like;

		if (type === "event") {
			const event = await prisma.event.findUnique({ where: { id: parseInt(params.id) }, include: { likes: true } });
			if (!event) {
				return NextResponse.json({ error: "ไม่พบกิจกรรมนี้" }, { status: 404 });
			}

			like = event.likes.find((like) => like.userId === session.user.id && like.eventId === event.id);
		} else {
			const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) }, include: { likes: true } });
			if (!post) {
				return NextResponse.json({ error: "ไม่พบโพสต์นี้" }, { status: 404 });
			}

			like = post.likes.find((like) => like.userId === session.user.id && like.postId === post.id);
		}

		const deleltedLike = await prisma.like.delete({ where: { id: like?.id } });
		return NextResponse.json(deleltedLike, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
