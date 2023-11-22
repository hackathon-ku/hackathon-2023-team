import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createEventSchema, createPostSchema } from "@/app/validator";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { PostFormType } from "@/types/post";
import { PostType } from "@prisma/client";

export async function POST(request: NextRequest) {
	const postType = request.nextUrl.searchParams.get("type") as PostFormType;
	const body = await request.json();

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "คุณจำเป็นต้องเข้าสู่ระบบก่อน" }, { status: 401 });
	}

	if (!postType) {
		return NextResponse.json("กรุณาใส่ประเภทของโพสต์", { status: 400 });
	}

	if (postType === "event") {
		const validation = createEventSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json("กรุณากรอกข้อมูลให้ถูกต้อง", { status: 400 });
		}

		const member = await prisma.member.findUnique({ where: { userId: session.user.id, clubId: body.clubId } });
		if (!member) {
			return NextResponse.json({ error: "คุณไม่ใช่สมาชิกของชมรมนี้" }, { status: 403 });
		}

		if (member.role !== "ADMIN") {
			return NextResponse.json({ error: "คุณไม่ใช่แอดมินของชมรมนี้" }, { status: 403 });
		}

		const newEvent = await prisma.event.create({
			data: {
				...validation.data,
				startDate: new Date(body.startDate),
				endDate: new Date(body.endDate),
				// TODO: Uncomment this when we have a bannerUrl field
				imageUrl:
					"https://p-u.popcdn.net/event_details/posters/000/016/273/large/1e3907ba3ac67791527cb88cbe5bab66fa5b0a2d.png?1695702668",
				ownerId: member.id,
			},
		});

		return NextResponse.json(newEvent, { status: 201 });
	} else if (postType === "news") {
		const validation = createPostSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json("กรุณากรอกข้อมูลให้ถูกต้อง", { status: 400 });
		}

		const member = await prisma.member.findUnique({ where: { userId: session.user.id, clubId: body.clubId } });
		if (!member) {
			return NextResponse.json({ error: "คุณไม่ใช่สมาชิกของชมรมนี้" }, { status: 403 });
		}

		if (member.role !== "ADMIN") {
			return NextResponse.json({ error: "คุณไม่ใช่แอดมินของชมรมนี้" }, { status: 403 });
		}

		const newPost = await prisma.post.create({
			data: {
				...validation.data,
				type: postFormTypeToPostType(postType),
				imageUrl:
					"https://p-u.popcdn.net/event_details/posters/000/016/273/large/1e3907ba3ac67791527cb88cbe5bab66fa5b0a2d.png?1695702668",
				ownerId: session.user.id,
			},
		});

		return NextResponse.json(newPost, { status: 201 });
	} else {
		const validation = createPostSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json("กรุณากรอกข้อมูลให้ถูกต้อง", { status: 400 });
		}

		const user = await prisma.user.findUnique({ where: { id: session.user.id } });
		if (!user) {
			return NextResponse.json({ error: "ไม่พบผู้ใช้งาน" }, { status: 404 });
		}

		const newPost = await prisma.post.create({
			data: {
				...validation.data,
				type: postFormTypeToPostType(postType),
				imageUrl:
					"https://p-u.popcdn.net/event_details/posters/000/016/273/large/1e3907ba3ac67791527cb88cbe5bab66fa5b0a2d.png?1695702668",
				ownerId: user.id,
				approved: true,
			},
		});

		return NextResponse.json(newPost, { status: 201 });
	}
}

function postFormTypeToPostType(postFormType: PostFormType): PostType {
	switch (postFormType) {
		case "normal_post":
			return PostType.NORMAL_POST;
		case "news":
			return PostType.NEWS;
		case "qna":
			return PostType.QA;
		default:
			return PostType.NORMAL_POST;
	}
}
