import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import MembersBox from "@/components/Memberbox";
import EventBox from '@/components/EventBox'
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
    status: string;
}


const EventComponent = async (props: MembersComponentProps) => {
	const events = await prisma.event.findMany({
        where: {
            clubId: parseInt(props.clubId),
        },
    }
    );
    // console.log(events);

    const currentDate = new Date();

    const presentEvents = events.filter((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return startDate <= currentDate && currentDate <= endDate;
    });

    const upcomingEvents = events.filter((event) => {
        const startDate = new Date(event.startDate);
        return startDate > currentDate;
    });

    const pastEvents = events.filter((event) => {
        const endDate = new Date(event.endDate);
        return endDate < currentDate;
    });
    
	return (
		<div className="flex flex-col gap-[20px]">
			<p>{props.status}</p>
			{events.length > 0 && (
            <>
            {props.status === 'กิจกรรมที่กำลังจัดตอนนี้' && presentEvents.length > 0 && (
                <div className="flex flex-col gap-[20px] w-full  border-[2px] border-[#28C3D7] rounded-[20px] ">
                {presentEvents.map((event) => (
                    <EventBox 
                    key={event.id} 
                    eventName={event.title} 
                    link={'/'} 
                    startDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.startDate))} 
                    endDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.endDate))} 
                    location={event.location} />
                ))}
                </div>
            )}

            {props.status === 'กิจกรรมที่กำลังจะเกิดขึ้น' && upcomingEvents.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                {upcomingEvents.map((event) => (
                    <EventBox 
                    key={event.id} 
                    eventName={event.title} 
                    link={'/'} 
                    startDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.startDate))} 
                    endDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.endDate))} 
                    location={event.location} />
                ))}
                </div>
            )}

            {props.status === 'กิจกรรมที่ผ่านมา' && pastEvents.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                {pastEvents.map((event) => (
                    <EventBox 
                    key={event.id} 
                    eventName={event.title} 
                    link={'/'} 
                    startDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.startDate))} 
                    endDate={Intl.DateTimeFormat('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }).format(new Date(event.endDate))} 
                    location={event.location} />
                ))}
                </div>
            )}
            </>
        )}
		</div>
	);
};

export default async function Members({ params }: MembersPageProps) {
	const membersComponentInputs: MembersComponentProps[] = [
		{ clubId: params.id, status: 'กิจกรรมที่กำลังจัดตอนนี้' },
		{ clubId: params.id,  status: 'กิจกรรมที่กำลังจะเกิดขึ้น' },
		{ clubId: params.id,  status: 'กิจกรรมที่ผ่านมา' },
	];

	return (
		<div className="p-[24px]  flex flex-col gap-[20px]">
			<h1 className="text-[24px] font-bold">ชมรมดนตรีสากลมหาวิทยาลัยเกษตรศาสตร์ (เค ยู แบนด์)</h1>
			<p className="font-bold">กิจกรรมทั้งหมด</p>

			{membersComponentInputs.map((input) => {
				return <EventComponent clubId={input.clubId} status={input.status} key={input.status} />;
			})}
		</div>
	);
}
