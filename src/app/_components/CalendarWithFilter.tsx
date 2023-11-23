"use client";
import React, { useEffect, useState } from "react";
import SelectWrapper from "./SelectWrapper";
import CalendarWrapper, { CalendarWrapperProps } from "./CalendarWrapper";
import { Club, KUBranch } from "@prisma/client";
import { User } from "next-auth";
import FollowFilter from "./FollowFilter";

interface ClubWithSubscriber extends Club{
	subscribers: User[]
}

interface CalendarWithFilterProps extends CalendarWrapperProps {
	user: User | undefined;
	clubs: ClubWithSubscriber[]
}

const CalendarWithFilter: React.FC<CalendarWithFilterProps> = ({ events, user, clubs }) => {
	const [campus, setCampus] = useState("บางเขน");
	const [filterFollowings, setFilterFollowings] = useState({ club: false, event: false })
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
		let filtered = events;

		if (user) {
			if (filterFollowings.event) {
				const followersId = events.map(e => e.followers).flat().map(f => f.id);
	
				filtered = filtered.filter(_ => followersId.includes(user.id));
			}

			if (filterFollowings.club) {
				const subscribersId = clubs.map(c => c.subscribers).flat().map(s => s.id);

				filtered = filtered.filter(_ => subscribersId.includes(user.id));
			}
		}

		filtered = filtered.filter(e => getThaiBranch(e.club.branch) === campus);

		
		setFilteredEvents(filtered);

		return () => {};
	}, [campus, filterFollowings]);

	return (
		<>
			<div className="w-full flex items-start gap-2">
				<SelectWrapper value={campus} setValue={setCampus} />
				{user ? (
					<>
						<FollowFilter followingCheck={filterFollowings} setFollowingCheck={setFilterFollowings}/>
					</>
				) : (
					""
				)}
			</div>
			<CalendarWrapper events={fitleredEvents} />
		</>
	);
};

export default CalendarWithFilter;
