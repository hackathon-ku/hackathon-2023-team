import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ClubParams } from "../types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: ClubParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 403 });
	}

	const newMember = await prisma.member.create({
		data: {
			userId: session.user.id,
			clubId: parseInt(params.id),
		},
	});
    return NextResponse.json(newMember, { status: 201 })
}
