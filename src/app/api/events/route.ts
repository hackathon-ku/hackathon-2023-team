import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { createEventSchema } from "@/app/validator";

export async function GET() {
	const events = await prisma.event.findMany({
		where: {
			approved: true,
		},
		orderBy: {
			startDate: "asc",
		},
	});

	return NextResponse.json(events, { status: 200 });
}

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = createEventSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You are not authenticated" }, { status: 401 });
	}

	const member = await prisma.member.findUnique({ where: { userId: session.user.id, clubId: body.clubId } });
	if (!member) {
		return NextResponse.json({ error: "You are not a member of this club" }, { status: 403 });
	}

	if (member.role !== "ADMIN") {
		return NextResponse.json({ error: "You are not an admin of this club" }, { status: 403 });
	}

	const newEvent = await prisma.event.create({
		data: {
			...body,
			startDate: new Date(body.startDate),
			endDate: new Date(body.endDate),
			// TODO: Uncomment this when we have a bannerUrl field
			bannerUrl: "https://google.com",
			ownerId: member.id,
		},
	});

	return NextResponse.json(newEvent, { status: 201 });
}
