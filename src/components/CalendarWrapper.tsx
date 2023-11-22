"use client";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/th";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.locale("th");

const CalendarWrapper = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());

	const getNextMonth = (month: number) => (month >= 11 ? 0 : month + 1);
	const getPrevMonth = (month: number) => (month <= 0 ? 11 : month - 1);
    const getSize = () => {
        const windowSize = window.innerWidth;

        if (windowSize <= 320) return "xs"
        else if (windowSize <= 375) return "sm"
        else if (windowSize <= 425) return "md"
    }

	return (
		<DatePicker
			allowDeselect
			value={selectedDate}
			onChange={setSelectedDate}
			locale="th"
			styles={{
				calendarHeaderLevel: {
					color: "#006664",
					fontWeight: "bold",
					paddingBottom: "0.25rem",
                    fontSize: "1rem",
                    width: "fit-content",
                    textAlign: "center"
				},
				calendarHeaderControl: {
					color: "#B2BB1E",
					width: "fit-content",
					fontSize: "0.875rem",
				},
				monthThead: {
					backgroundColor: "#28C3D7",
					border: "1px solid #F2F2F2",
				},
				weekdaysRow: {},
				weekday: {
					color: "white",
					border: "1px solid #F2F2F2",
				},
				month: {
					borderCollapse: "collapse",
				},
				monthRow: {
					border: "1px solid #F2F2F2",
				},
				monthCell: {
					border: "1px solid #F2F2F2",
				},
			}}
			nextIcon={<span>{dayjs.months()[getNextMonth(currentMonth)]} &#62; </span>}
			previousIcon={<span>&#60; {dayjs.months()[getPrevMonth(currentMonth)]}</span>}
			onPreviousMonth={(date: Date) => {
				setCurrentMonth(dayjs(date).month());
			}}
			onNextMonth={(date: Date) => {
				setCurrentMonth(dayjs(date).month());
			}}
			firstDayOfWeek={0}
            size={getSize()}
            maxLevel="month"
		></DatePicker>
	);
};

export default CalendarWrapper;
