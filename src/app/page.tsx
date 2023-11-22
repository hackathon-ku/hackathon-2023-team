import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import "@mantine/dates/styles.css";
import CalendarWrapper from "@/components/CalendarWrapper";
import News from "@/components/News";

export default async function EventPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-white gap-8">
      <h1 className="self-start text-2xl font-bold">ตารางอีเว้นท์และกิจกรรม</h1>
      <CalendarWrapper />
      <h1 className="self-start text-2xl font-bold">ข่าวสารจากชมรม</h1>
      <News />
      <News />
      <button className="self-end rounded-full py-1.5 px-6 border border-[#006664] text-[#006664] text-sm">
        ข่าวสารทั้งหมด
      </button>
    </main>
  );
}
