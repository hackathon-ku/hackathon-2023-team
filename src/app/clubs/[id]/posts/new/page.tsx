import prisma from "@/lib/prisma";
import EventForm from "@/components/EventForm";
import { cache } from "react";

interface NewEventPageProps {
	params: { id: string };
}

const fetchClub = cache((issueId: number) => prisma.club.findUnique({ where: { id: issueId } }));

export default async function NewEventPage({ params }: NewEventPageProps) {
	const club = await fetchClub(parseInt(params.id));

	if (!club) return null;

	return (
		<div>
			<h1>{JSON.stringify(club)}</h1>
			<EventForm clubId={club.id} />
		</div>
	);
}
