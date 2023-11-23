"use client";
import React, { useEffect, useState } from "react";
import { DatePicker, DatePickerProps, DateValue } from "@mantine/dates";
import "dayjs/locale/th";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { Club, Event, User } from "@prisma/client";
import { Indicator } from "@mantine/core";
import EventBox from "./Event";
import { animated, useSpring, useTransition } from "@react-spring/web";
import Link from "next/link";

dayjs.extend(localeData);
dayjs.locale("th");

interface EventWithClub extends Event {
	club: Club;
}

interface EventWithClubWithFollwer extends EventWithClub {
  followers: User[]
}
export interface CalendarWrapperProps {
	events: EventWithClubWithFollwer[];
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [eventInRange, setEventInRange] = useState<EventWithClub[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());
  const eventTransition = useTransition(eventInRange, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: eventInRange.length === 0 ? 1 : 0 },
  })

	const getNextMonth = (month: number) => (month >= 11 ? 0 : month + 1);
	const getPrevMonth = (month: number) => (month <= 0 ? 11 : month - 1);
	const getSize = () => {
		const windowSize = window.innerWidth;

		if (windowSize <= 320) return "xs";
		else if (windowSize <= 375) return "sm";
		else if (windowSize <= 425) return "md";
    // else if (windowSize <= )
	};
	const dayRenderer: DatePickerProps["renderDay"] = (date) => {
		const day = date.getDate();
		const event = events.filter((e) => {
			return checkDateInRange(e.startDate, date, e.endDate);
		});

		return event.length != 0 ? (
			<Indicator size={6} color="gray" offset={-3}>
				<div>{day}</div>
			</Indicator>
		) : (
			<div>{day}</div>
		);
	};

	const onDateChange = (date: DateValue) => {
		setSelectedDate(date);

		if (date) {
			const inRangeEvent = events.filter((e) => {
				return checkDateInRange(e.startDate, date, e.endDate);
			});

      if (inRangeEvent.length !== 0) {
				setEventInRange(inRangeEvent);
			} else {
        setEventInRange([]);
      }
		} else {
			setEventInRange([]);
		}
	};

	const checkDateInRange = (startDate: Date, date: Date, endDate: Date) => {
		const day = {
			start: startDate.getDate(),
			actual: date.getDate(),
			endDate: endDate.getDate(),
		};

		const month = {
			start: startDate.getMonth(),
			actual: date.getMonth(),
			endDate: endDate.getMonth(),
		};

		const year = {
			start: startDate.getUTCFullYear(),
			actual: date.getUTCFullYear(),
			endDate: endDate.getUTCFullYear(),
		};

		return [day, month, year].filter((v) => v.start <= v.actual && v.actual <= v.endDate).length === 3;
	};

  return (
    <>
      <DatePicker
        allowDeselect
        value={selectedDate}
        onChange={onDateChange}
        locale="th"
        styles={{
          calendarHeaderLevel: {
            color: "#006664",
            fontWeight: "bold",
            paddingBottom: "0.25rem",
            fontSize: "1rem",
            width: "fit-content",
            textAlign: "center",
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
        nextIcon={
          <span>{dayjs.months()[getNextMonth(currentMonth)]} &#62; </span>
        }
        previousIcon={
          <span>&#60; {dayjs.months()[getPrevMonth(currentMonth)]}</span>
        }
        onPreviousMonth={(date: Date) => {
          setCurrentMonth(dayjs(date).month());
        }}
        onNextMonth={(date: Date) => {
          setCurrentMonth(dayjs(date).month());
        }}
        firstDayOfWeek={0}
        size={getSize()}
        maxLevel="month"
        renderDay={dayRenderer}
      ></DatePicker>
      {eventTransition((style, item) =>
        (<animated.div style={style}>
          <Link href={"/events/" + item.id}>
            <EventBox
              clubName={item.club.name}
              eventName={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              location={item.location}
              key={item.id}
            />
          </Link>
        </animated.div>)
      )}
      {<animated.p style={props}>ไม่มีกิจกรรมในช่วงเวลานี้</animated.p>}
    </>
  );
};

export default CalendarWrapper;
