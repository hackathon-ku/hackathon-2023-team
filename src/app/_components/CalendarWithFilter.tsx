"use client";
import React, { useEffect, useState } from "react";
import SelectWrapper from "./SelectWrapper";
import CalendarWrapper, { CalendarWrapperProps } from "./CalendarWrapper";
import { KUBranch } from "@prisma/client";

interface CalendarWithFilterProps extends CalendarWrapperProps {}

const CalendarWithFilter: React.FC<CalendarWithFilterProps> = ({ events }) => {
	const [campus, setCampus] = useState("บางเขน");
	const [fitleredEvents, setFilteredEvents] = useState(events);

	const getThaiBranch = (branch: KUBranch) => {
		switch (branch) {
			case KUBranch.Bangkhen:
				return "บางเขน";
			case KUBranch.KamphaengSaen:
				return "กำแพงแสน";
			case KUBranch.Sriracha:
				return "ศรีราชา";
		}
	};

	useEffect(() => {
		const filtered = events.filter((e) => getThaiBranch(e.club.branch) === campus);
		setFilteredEvents(filtered);

		return () => {};
	}, [campus]);

	return (
		<>
            <div className="w-full flex items-start">
			    <SelectWrapper value={campus} setValue={setCampus} />
            </div>
			<CalendarWrapper events={fitleredEvents} />
		</>
	);
};

export default CalendarWithFilter;
