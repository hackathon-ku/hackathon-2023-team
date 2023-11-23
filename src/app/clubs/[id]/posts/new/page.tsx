import prisma from "@/lib/prisma";
import { cache } from "react";
import PostForm from "@/app/clubs/_components/PostForm";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface NewEventPageProps {
	params: { id: string };
}

const fetchClub = cache((clubId: number) => prisma.club.findUnique({ where: { id: clubId } }));
const fetchMember = cache((clubId: number, userId?: number) => prisma.member.findUnique({ where: { clubId, userId } }));

export default async function NewEventPage({ params }: NewEventPageProps) {
	const session = await getServerSession(authOptions);
	const club = await fetchClub(parseInt(params.id));

	const member = await fetchMember(parseInt(params.id), session?.user.id);

	if (!club) return null;

	return (
		<div className="flex flex-col">
			<div className="bg-[#006664] px-6 py-4">
				<span className="text-white font-bold">{club.label}</span>
			</div>
			<PostForm role={member?.role} clubId={club.id} />
		</div>
	);
}
