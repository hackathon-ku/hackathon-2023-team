"use-client";

import { registerMemberData } from "@/app/api/mock-data";
import React from "react";
// import { Modal } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";

interface RequestedMemberProb {
	m: string;
}

const RequestedMember: React.FC<RequestedMemberProb> = ({ m }) => {
	// const [opened, { open, close }] = useDisclosure(false);
	const member = registerMemberData.data.user;

	return (
		<div className="flex flex-col">
			<div className="px-6 pt-4">
				<span className="text-[#2F3337] text-2xl font-bold">ชมรมดนตรีสากลมหาวิทยาลัย เกษตรศาสตร์ (เค ยู แบนด์)</span>
			</div>

			<div className="p-[24px] flex flex-col gap-[20px] ">
				<p className="font-bold text-base">ผู้สมัครเข้าชมรมทั้งหมด</p>
				<div className="items-center">
					<div className="flex flex-col justify-between p-4 w-full border border-gray-200 rounded-xl shadow-xl">
						<p className="text-2xl font-bold">{member.name}</p>
						<div className="py-2">
							<p>
								<span className="font-bold">ชั้นปี</span>: {member.year}
							</p>
							<p>
								<span className="font-bold">คณะ</span>: {member.faculty}
							</p>
							<p>
								<span className="font-bold">สาขา</span>: {member.department}
							</p>
							<p>
								<span className="font-bold">email</span>: {member.email}
							</p>
							<p>
								<span className="font-bold">เบอร์โทรศัพท์</span>: {member.phone}
							</p>
							<p>
								<span className="font-bold">เหตุผลที่อยากเข้าชมรม</span>: {member.reason}
							</p>
						</div>
						<div className="flex flex-row">
							<button
								className="block text-sm text-white py-1 px-4 border mr-1 bg-[#006664] rounded-full"
								// onClick={open}
							>
								เพิ่มสมาชิก
							</button>
							<button className="block text-sm text-[#F24B4B] py-1 px-4 border border-[#F24B4B] rounded-full">
								ปฏิเสธ
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* <Modal opened={opened} onClose={close}>
				<p className="font-light mb-2">
					คุณตกลงรับ <span className="font-bold text-[#006664]">มิกกี้ เมาส์</span>
					<p>เป็นสมาชิกชมรมใช่หรือไม่</p>
				</p>
				<div className="flex gap-2 pt-2 items-center justify-center">
					<button onClick={() => {}} className="py-1 px-4 rounded-full bg-[#006664] text-white">
						ตกลง
					</button>
					<button
						type="submit"
						onClick={close}
						className="py-1 px-4 rounded-full border border-[#F24B4B] text-[#F24B4B]"
					>
						ยกเลิก
					</button>
				</div>
			</Modal> */}
		</div>
	);
};

export default RequestedMember;
