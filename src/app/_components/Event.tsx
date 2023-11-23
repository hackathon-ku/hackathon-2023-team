import dayjs from "dayjs";
import React from "react";

interface EventBoxProps {
  clubName: string,
  eventName: string,
  startDate: Date,
  endDate: Date,
  location: string
}

const EventBox: React.FC<EventBoxProps> = ({ clubName, eventName, startDate, endDate, location }) => {
  return (
    <div className="w-full p-4 rounded-[20px]" style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.10)" }}>
      <header className="flex items-center gap-2 mb-2">
        <div className="rounded-full p-4 h-6 w-6 flex items-center justify-center bg-orange-400 color-white">
          A
        </div>
        <div className="w-full flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <p className="h-1/2 font-normal">{clubName}</p>
          </div>
        </div>
      </header>
      <section>
        <h2 className="text-2xl">{eventName}</h2>
        <p className="font-light">วันเริ่มต้นและสิ้นสุด: {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}</p>
        <p className="font-light">สถานที่กิจกรรม: {location}</p>
      </section>
    </div>
  );
};

export default EventBox;
