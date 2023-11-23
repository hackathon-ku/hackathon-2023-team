import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import MemberPostForm from "./_components/MemberPostForm";
import { cache } from "react";
import prisma from "@/lib/prisma";

interface NewMemberPageProps {
	params: { id: string };
}

const fetchClub = cache((issueId: number) => prisma.club.findUnique({ where: { id: issueId } }));

export default async function NewMemberPage({ params }: NewMemberPageProps) {
    const session = await getServerSession(authOptions);
    const club = await fetchClub(parseInt(params.id));

	if (!session) {
		return (
			<div className='flex justify-center'>
				กรุณาเข้าสู่ระบบเพื่อสมัครสมาชิกชมรม	
			</div>
		)
	};

	return (
		<div className="flex flex-col">
			<div className="bg-[#006664] px-6 py-4">
				<span className="text-white font-bold">{club?.label}</span>
			</div>
			<MemberPostForm user={session.user} clubId={params.id} />
		</div>
	);
}