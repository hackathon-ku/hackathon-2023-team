import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import "@mantine/dates/styles.css";

export default async function EventPage() {
	const session = await getServerSession(authOptions);

	if (session)
		return (
			<main className="flex min-h-screen flex-col items-center p-12 bg-white gap-8">
				{JSON.stringify(session)}
			</main>
		);
	return <h1>Event Page</h1>;
}
