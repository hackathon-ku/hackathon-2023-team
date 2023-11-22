import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import MembersBox from "@/components/Memberbox";
import { cache } from "react";
import { Role, User } from "@prisma/client";

type ClubQuery = {
	q: string | undefined;
};

interface MembersPageProps {
	params: { id: string };
}

interface MembersComponentProps {
	clubId: string;
	name: string;
	role: Role;
}

const fetchClubWithMembersByRole = cache((clubId: number, memberRole: Role) =>
	prisma.club.findUnique({
		where: { id: clubId, members: { every: { role: memberRole } } },
		include: { members: true },
	}),
);

const fetchUserById = cache((userId: number) => prisma.user.findUnique({ where: { id: userId } }));

const MembersComponent = async (props: MembersComponentProps) => {
	const clubRole = await fetchClubWithMembersByRole(parseInt(props.clubId), props.role);

	return (
		<div>
			<p>{props.name}</p>
			{clubRole ? (
				clubRole.members.map(async (member) => {
					const userName: any = await fetchUserById(member.userId);
					return (
						<MembersBox
							key={member.userId}
							name={userName ? userName.titleTh + userName.firstNameTh + " " + userName.lastNameTh : ""}
						/>
					);
				})
			) : (
				<MembersBox name="No members found" />
			)}
		</div>
	);
};

export default async function Members({ params }: MembersPageProps) {
	const membersComponentInputs: MembersComponentProps[] = [
		{ clubId: params.id, name: "หัวหน้า", role: Role.PRESIDENT },
		{ clubId: params.id, name: "รองหัวหน้า", role: Role.VICE_PRESIDENT },
		{ clubId: params.id, name: "Admin", role: Role.ADMIN },
		{ clubId: params.id, name: "สมาชิกทั่วไป", role: Role.NORMAL },
	];

	return (
		<div className="p-[24px]  flex flex-col gap-[20px]">
			<h1 className="text-[24px] font-bold">ชมรมดนตรีสากลมหาวิทยาลัยเกษตรศาสตร์ (เค ยู แบนด์)</h1>
			<p className="font-bold">สมาชิกทั้งหมด</p>

			{membersComponentInputs.map((input) => {
				return <MembersComponent clubId={input.clubId} name={input.name} role={input.role} key={input.name} />;
			})}
		</div>
	);
}
