"use client";

import Link from "next/link";
import News from "@/app/_components/News";
import { $Enums } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";

type ClubPostProps = {
    id: number;
    title: string;
    type: string;
    content: string;
    imageUrl: string;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
    clubId: number;
    ownerId: number;
    club: {
        id: number;
        name: string;
        label: string;
        category: string;
        branch: string;
        location: string;
        phoneNumber: string;
        socialMedia: string[];
        createdAt: Date;
        updatedAt: Date;
    };
    owner: {
        id: number;
        stdId: string;
        titleTh: string;
        titleEn: string;
        firstNameTh: string;
        lastNameTh: string;
        firstNameEn: string;
        lastNameEn: string;
        campusNameTh: string;
        campusNameEn: string;
    };
    likes: {
        id: number;
        createdAt: Date;
        userId: number;
        postId: number;
        eventId: number;
    }[];
};

export default function ClubPosts({posts, clubId} : any) {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleButtonClick = (type: string) => {
        if (selectedTypes.includes(type)) {
        setSelectedTypes((prevSelectedTypes) =>
            prevSelectedTypes.filter((selectedType) => selectedType !== type)
        );
        } else {
        setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
        }
    };
    const filteredPosts = posts.filter((post: any) => selectedTypes.includes(post.type));

	return (
        <>
            <div className="flex gap-[5px]">
                <button onClick={() => handleButtonClick('NORMAL_POST')} 
                className={`px-[15px] py-[4px] w-min h-fit whitespace-nowrap border border-1 rounded-[20px] ${
                    selectedTypes.includes('NORMAL_POST') ? 'bg-[#28C3D7] border-[#28C3D7] text-white' : 'border-[#28C3D7] text-[#28C3D7]'
                }`}
                >
                    โพสต์ทั่วไป
                </button>
                <button onClick={() => handleButtonClick('NEWS')} 
                className={`px-[15px] py-[4px] w-min h-fit whitespace-nowrap border border-1 rounded-[20px] ${
                    selectedTypes.includes('NEWS') ? 'bg-[#03A96B] border-[#03A96B] text-white' : 'border-[#03A96B] text-[#03A96B]'
                }`}
                >
                    news
                </button>
                <button onClick={() => handleButtonClick('QA')} 
                className={`px-[15px] py-[4px] w-min h-fit whitespace-nowrap border border-1 rounded-[20px] ${
                    selectedTypes.includes('QA') ? 'bg-[#F2914B] border-[#F2914B] text-white' : 'border-[#F2914B] text-[#F2914B]'
                }`}
                >
                    Q&A
                </button>
                <button onClick={() => handleButtonClick('EVENT')} 
                className={`px-[15px] py-[4px] w-min h-fit whitespace-nowrap border border-1 rounded-[20px] ${
                    selectedTypes.includes('EVENT') ? 'bg-[#F24B4B] border-[#F24B4B] text-white' : 'border-[#F24B4B] text-[#F24B4B]'
                }`}
                >
                    event
                </button>
            </div>                    
            {selectedTypes.length === 0 ? (
                // If selectedTypes is empty, show all posts
                posts.map((p: any) => (
                <div key={p.id}>
                    <News post={p} key={p.id} />
                </div>
                ))
            ) : (
                // If selectedTypes is not empty, show filtered posts
                filteredPosts.map((p: any) => (
                <div key={p.id}>
                    <News post={p} key={p.id} />
                </div>
                ))
            )}
            {(filteredPosts.length === 0 && selectedTypes.length !== 0) &&
                <p>ไม่พบข้อมูล</p> 
            }
            <Link href={`/clubs/${clubId}/posts/new`} className="fixed bottom-[24px] right-[24px] z-50">
                <Image alt="line" src="/icons/plus-icon.svg" width="64" height="64"  />
            </Link>
        </>
		
	);
}
