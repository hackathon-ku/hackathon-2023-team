import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import type { PostParams } from "../types";

export async function POST(request: NextRequest, { params }: PostParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	try {
		const newLike = await prisma.like.create({
			data: {
				userId: session.user.id,
				postId: parseInt(params.id),
			},
		});
		return NextResponse.json(newLike, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function DELETE(reqeust: NextRequest, { params }: PostParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
	}

	const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) }, include: { likes: true } });
	if (!post) {
		return NextResponse.json({ error: "ไม่พบโพสต์นี้" }, { status: 404 });
	}

	const like = post.likes.find((like) => like.userId === session.user.id && like.postId === post.id);
	if (!like) {
		return NextResponse.json({ error: "ไม่พบการถูกใจนี้" }, { status: 404 });
	}

	const deleltedLike = await prisma.like.delete({ where: { id: like.id } });
	return NextResponse.json(deleltedLike, { status: 200 });
}
