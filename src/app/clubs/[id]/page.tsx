import prisma from "@/lib/prisma";
import EventBox from '@/components/EventBox'
import ClubPosts from "./_components/ClubPosts"

import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import RegisterButton from "./_components/RegisterButton";

type Props = {
    params: { id: string };
};

export type PostInclude = Prisma.PostGetPayload<{
	include: {
		club: true;
		owner: true;
		likes: true;
	};
}>;

const fetchRoleById = cache((userId: number) =>
    prisma.member.findUnique({
        where: { userId: userId },
    }),
);

export default async function ClubsProfile({ params }: Props) {
    const clubId = params.id;

    const club =  await prisma.club.findUnique(
        {
            where: {
                id: parseInt(clubId),
            },
        }
    );
    
	const posts = await prisma.post.findMany({
        where: {
            approved: true,
            clubId: parseInt(clubId),
        },
        include: { club: true, owner: true, likes: true },
    });

    const session = await getServerSession(authOptions);

    const userRole = session ? await fetchRoleById(session.user.id) : null;
    
    const events = await prisma.event.findMany({
        where: {
            clubId: parseInt(clubId),
        },
    });
    
    const members = await prisma.user.findMany();

	return (
		<div>
			{/* ------------------------------ images ------------------------------*/}

            <div className="w-full h-[270px] relative -z-10 flex justify-center">
                <Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "auto", height: "100%", objectFit: 'cover' }}
					alt={"event"}
				/>
            </div>

			{/* ------------------------------ club detail ------------------------------*/}

            <div className="bg-[#006664] w-ful flex flex-col gap-[15px] p-[24px] text-white rounded-t-[20px] relative -mt-[20px]">
                <h1 className="font-bold">{club?.label}</h1>
                <div>
                    <p>หมวดหมู่: <span>{club?.category}</span></p>
                    <p>ที่อยู่: <span>{club?.location}</span></p>
                    <p>โทรศัพท์: <span>{club?.phoneNumber}</span></p>
                </div>
                <div className="flex justify-between">
				<div className="flex gap-2">
						<button className="px-[15px] py-[4px] w-min border border-1 border-white rounded-[20px]">Follow</button>
						<RegisterButton clubId={"1"} />
					</div>
                    <div className="flex gap-[10px]">
                        <Link href={club.socialMedia[0].link} className="flex items-center"><Image alt="facebook" src="/icons/facebook.svg" width="16" height="16" /></Link>
                        <Link href={club.socialMedia[1].link} className="flex items-center"><Image alt="instagram" src="/icons/instagram.svg" width="16" height="16" /></Link>
                        <Link href={club.socialMedia[2].link} className="flex items-center"><Image alt="line" src="/icons/line.svg" width="20" height="20" /></Link>
                    </div>
                </div>
            </div>

			{/* ------------------------------ upcoming event ------------------------------*/}

            <div>
                <div className="flex justify-between px-[24px] pt-[24px]">
                    <h1 className="font-bold text-[#006664]">Upcoming Event</h1>
                    <Link href={`/clubs/${clubId}/events`} className="text-[12px] underline underline-offset-2 text-center h-min my-auto">ดูตารางกิจกรรมทั้งหมด</Link>
                </div>
                <div className="flex gap-[10px] pl-[24px] pb-[24px] pt-[15px] pr-[24px] overflow-auto scrollbar-hide">
                    {events.map((event)=>(
                        <EventBox 
                        key={event.id} 
                        eventName={event.title} 
                        link={'/'} 
                        startDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.startDate))} 
                        endDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.endDate))} 
                        location={event.location} />
                    ))}
                </div>
            </div>

			{/* ------------------------------ club members ------------------------------*/}

            <div className="bg-[#FFFFDD]">
                <div className="flex justify-between px-[24px] pt-[24px]">
                    <h1 className="font-bold">จำนวนสมาชิก {members.length} คน</h1>
                    <Link href={`/clubs/${clubId}/members`} className="text-[12px] underline underline-offset-2 text-center h-min my-auto">ดูสมาชิกทั้งหมด</Link>
                </div>
                <div className="flex gap-[15px] px-[24px] pb-[24px] pt-[15px] overflow-auto">
                    {members.map((member)=>(
                        <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]" key={member.id}>
                            <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                                <p className="text-white">{member.firstNameEn[0]}</p>
                            </div>
                            <p>{member.firstNameTh}</p>
                        </div>
                    ))}
                </div>
            </div>

			{/* ------------------------------ club news ------------------------------*/}

            <div className="p-[24px] flex flex-col gap-[20px]">
                <div className="flex">
                    <p className="font-bold text-[24px] w-full ">โพสต์</p>
                    {session && userRole && (
                        <Link href={"#"} className="w-min whitespace-nowrap underline h-min my-auto text-[12px]">
                            โพสต์ที่รออนุมัติ
                        </Link>  
                    )}
                    
                </div>
                
                
                                    
                <ClubPosts posts={posts} clubId={clubId}/>
            </div>
			{/* <p>{JSON.stringify(clubs)}</p> */}
		</div>
	);
}
