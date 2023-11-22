import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.club.upsert({
		where: { name: "ku-band" },
		update: {},
		create: {
			name: "ku-band",
			label: "ชมรมดนตรีสากลมหาวิทยาลัยเกษตรศาสตร์ (เค ยู แบนด์)",
			category: "UnitOfActivitiesForCharityAndAcademic",
			branch: "Bangkhen",
			location: "อาคารKU BAND มหาวิทยาลัยเกษตรศาสตร์ แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10220",
			phoneNumber: "0929241839",
			socialMedia: [
				{
					name: "facebook",
					link: "https://www.facebook.com",
				},
				{
					name: "instagram",
					link: "https://www.instagram.com",
				},
				{
					name: "line",
					link: "https://www.line.com",
				},
			],
			events: {
				create: {
					title: "KU Band Concert",
					content: "KU Band Concert 2023",
					imageUrl:
						"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9652580b-c8a4-4682-8b92-827246ba246d/dc0kxfi-abf76a80-a5a3-43c8-8bd1-08c30d847ee2.jpg/v1/fit/w_800,h_300,q_70,strp/red_velvet_peek_a_boo_banner_by_snitchefy_dc0kxfi-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzAwIiwicGF0aCI6IlwvZlwvOTY1MjU4MGItYzhhNC00NjgyLThiOTItODI3MjQ2YmEyNDZkXC9kYzBreGZpLWFiZjc2YTgwLWE1YTMtNDNjOC04YmQxLTA4YzMwZDg0N2VlMi5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.rVhz553Jehu81dHDqmIr_2Au0dYwExPybMXk8kM5kus",
					location: "สนามกีฬา มหาวิทยาลัยเกษตรศาสตร์",
					startDate: new Date("2023-11-20"),
					endDate: new Date("2023-11-23"),
					startTime: "09:00",
					endTime: "17:00",
					owner: {
						create: {
							userId: 1,
							clubId: 1,
						},
					},
				},
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
