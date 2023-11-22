import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import News from "@/components/News";
import EventBox from '@/components/EventBox'

import Link from "next/link";

type ClubQuery = {
	q: string | undefined;
};

type Props = {
	searchParams: ClubQuery;
};

export default async function clubsProfile({ searchParams }: Props) {
	const posts = await prisma.post.findMany({
        where: { approved: false },
        include: { club: true, owner: true }
      })

      console.log(posts);
      

	return (
		<div>
            {/* ------------------------------ images ------------------------------*/}

            <div className="bg-red-600 w-full h-[270px]">
            </div>

            {/* ------------------------------ club detail ------------------------------*/}

            <div className="bg-[#006664] w-ful flex flex-col gap-[15px] p-[24px] text-white rounded-t-[20px] -mt-[20px]">
                <h1 className="font-bold">ชมรมดนตรีสากลมหาวิทยาลัยเกษตรศาสตร์ (เค ยู แบนด์)</h1>
                <div>
                    <p>หมวดหมู่: <span>ศิลปวัฒนธรรมและกีฬา</span></p>
                    <p>ที่อยู่: <span>อาคารKU BAND มหาวิทยาลัยเกษตรศาสตร์ แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10220</span></p>
                    <p>โทรศัพท์: <span>0929241839</span></p>
                </div>
                <div className="flex justify-between">
                    <button className="px-[15px] py-[4px] w-min border border-1 border-white rounded-[20px]">follow</button>
                    <div className="flex gap-[10px]">
                        <button>FB</button>
                        <button>TW</button>
                        <button>IG</button>
                    </div>
                </div>
            </div>

            {/* ------------------------------ upcoming event ------------------------------*/}

            <div>
                <div className="flex justify-between px-[24px] pt-[24px]">
                    <h1 className="font-bold text-[#006664]">Upcoming Event</h1>
                    <p className="text-[12px] underline underline-offset-2 text-center">ดูตารางกิจกรรมทั้งหมด</p>
                </div>
                <div className="flex gap-[10px] pl-[24px] pb-[24px] pt-[15px] pr-[24px] overflow-auto scrollbar-hide">
                    <EventBox eventName={'ชื่อกิจกรรม'} link={'/'} startDate={'15 พ.ย. 66'} endDate={'24 พ.ย. 66'} location={'อาคารอะไรเอ่ย'} />
                    <EventBox eventName={'ชื่อกิจกรรม'} link={'/'} startDate={'15 พ.ย. 66'} endDate={'24 พ.ย. 66'} location={'อาคารอะไรเอ่ย'} />
                    <EventBox eventName={'ชื่อกิจกรรม'} link={'/'} startDate={'15 พ.ย. 66'} endDate={'24 พ.ย. 66'} location={'อาคารอะไรเอ่ย'} />
                </div>
            </div>

            {/* ------------------------------ club members ------------------------------*/}

            <div className="bg-[#FFFFDD]">
                <div className="flex justify-between px-[24px] pt-[24px]">
                    <h1 className="font-bold">จำนวนสมาชิก 56 คน</h1>
                    <Link href="/clubs" className="text-[12px] underline underline-offset-2 text-center">ดูสมาชิกทั้งหมด</Link>
                </div>
                <div className="flex gap-[15px] px-[24px] pb-[24px] pt-[15px] overflow-auto">
                    <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]">
                        <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                            <p className="text-white">A</p>
                        </div>
                        <p>นาย แล้วแต่</p>
                    </div>
                    <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]">
                    <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                            <p className="text-white">A</p>
                        </div>
                        <p>นาย แล้วแต่</p>
                    </div>
                    <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]">
                    <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                            <p className="text-white">A</p>
                        </div>
                        <p>นาย แล้วแต่</p>
                    </div>
                    <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]">
                    <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                            <p className="text-white">A</p>
                        </div>
                        <p>นาย แล้วแต่</p>
                    </div>
                    <div className="w-min h-min flex flex-col whitespace-nowrap gap-[10px]">
                    <div className="bg-[#006664] w-[32px] h-[32px] rounded-[20px] text-center flex items-center justify-center">
                            <p className="text-white">A</p>
                        </div>
                        <p>นาย แล้วแต่</p>
                    </div>
                </div>
            </div>

            {/* ------------------------------ club news ------------------------------*/}

            <div className="p-[24px] flex flex-col gap-[20px] items-center">
                <div className="flex justify-between w-full">
                    <p className="font-bold text-[24px] w-full">โพสต์</p>
                    <Link href={'#'} className="px-[15px] py-[4px] w-min whitespace-nowrap border border-1 border-[#006664] text-[#006664] rounded-[20px]">สร้างโพสต์</Link>
                </div>
                {posts.map(p => <Link href={`/clubs/posts/${p.id}`} key={p.id}>
                    <News name={p.club.label} date={p.createdAt} postBy={p.owner.firstNameTh} detail={p.content} img={"/event.png"} postId={p.id} tag={p.type}/>
                </Link>)}
                <Link href={'#'} className="px-[15px] py-[4px] w-min whitespace-nowrap border border-1 border-[#006664] text-[#006664] rounded-[20px]">แสดงเพิ่ม</Link>
            </div>
			{/* <p>{JSON.stringify(clubs)}</p> */}
		</div>
	);
}