import prisma from "@/lib/prisma";
import { cache } from "react";
import PostForm from "@/app/clubs/_components/PostForm";

interface NewEventPageProps {
	params: { id: string };
}

const fetchClub = cache((issueId: number) => prisma.club.findUnique({ where: { id: issueId } }));

export default async function NewEventPage({ params }: NewEventPageProps) {
	const club = await fetchClub(parseInt(params.id));

	if (!club) return null;

	return (
		<div className="flex flex-col">
			<div className="bg-[#006664] px-6 py-4">
				<span className="text-white font-bold">{club.label}</span>
			</div>
			<PostForm clubId={club.id} />
		</div>
	);
}
