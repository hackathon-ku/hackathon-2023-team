import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import ClubBox from "@/components/ClubBox";

type ClubQuery = {
	q: string | undefined;
};

type Props = {
	searchParams: ClubQuery;
};

export default async function Clubs({ searchParams }: Props) {
	const clubs = await prisma.club.findMany({
		where: {
			OR: [{ name: { contains: searchParams.q ?? "" } }, { label: { contains: searchParams.q ?? "" } }],
		},
	});
	
	return (
		<div className="p-[24px] flex flex-col gap-[20px]">
			<h1 className="text-2xl font-bold">ชมรมทั้งหมด</h1>
			<Search type="clubs" placeholder="ค้นหาชมรม" />
			<p className="font-bold">บางเขน</p>
			{clubs
				.filter((club) => club.branch === "Bangkhen")
				.map((club) => (
					<ClubBox clubId={club.id} clubName={club.label} key={club.id} />
				))}
			<p className="font-bold">วิทยาเขตกำแพงแสน</p>
			{clubs
				.filter((club) => club.branch === "KamphaengSaen")
				.map((club) => (
					<ClubBox clubId={club.id} clubName={club.label} key={club.id} />
				))}
			<p className="font-bold">วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร</p>
			{clubs
				.filter((club) => club.branch === "Bangkhen")
				.map((club) => (
					<ClubBox clubId={club.id} clubName={club.label} key={club.id} />
				))}
			<p className="font-bold">วิทยาเขตศรีราชา</p>
			{clubs
				.filter((club) => club.branch === "Sriracha")
				.map((club) => (
					<ClubBox clubId={club.id} clubName={club.label} key={club.id} />
				))}
			{/* <p>{JSON.stringify(clubs)}</p> */}
		</div>
	);
}
