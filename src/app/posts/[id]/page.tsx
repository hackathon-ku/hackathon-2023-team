import PostDetail from "@/components/PostDetail";
import Image from "next/image";

interface PostDetailPageProps {
	params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
	return (
		<div className="flex min-h-screen flex-col items-center bg-white">
			<div className="h-fit w-full relative">
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
					alt={"event"}
				/>
				<div className="absolute w-full bottom-0 p-3 font-bold bg-[#006664] text-white rounded-t-xl">
					ชมรมดนตรีสากลมหาวิทยาลัยเกษตรศาสตร์ (เค ยู แบนด์)
				</div>
			</div>
			<PostDetail />
		</div>
	);
}
