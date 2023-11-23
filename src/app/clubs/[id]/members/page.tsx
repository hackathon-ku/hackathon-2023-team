import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import MemberBox from "@/components/MemberBox";
import { cache } from "react";
import { Role, User } from "@prisma/client";

interface MembersPageProps {
	params: { id: string };
}

interface MembersComponentProps {
	clubId: string;
	name: string;
	role: Role;
}

const fetchUserById = cache((userId: number) => prisma.user.findUnique({ where: { id: userId } }));

const MembersComponent = async (props: MembersComponentProps) => {
	const members = await prisma.member.findMany({ where: { clubId: parseInt(props.clubId), role: props.role }})

	return (
		<div>
			<p>{props.name}</p>
			{members.length !== 0 ? (
				members.map(async (member) => {
					const userName: any = await fetchUserById(member.userId);
					return (
						<MemberBox
							key={member.userId}
							name={userName ? userName.titleTh + userName.firstNameTh + " " + userName.lastNameTh : ""}
						/>
					);
				})
			) : (
				<MemberBox name="ไม่พบสมาชิกในตำแหน่งนี้" />
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
