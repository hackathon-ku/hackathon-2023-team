import React from "react";

interface FilterButtonProps {
    name: string,
    checked: boolean,
    onClick: () => void
}

interface FollowFilterProps {
    followingCheck: { club: boolean, event: boolean },
    setFollowingCheck: React.Dispatch<React.SetStateAction<{
        club: boolean;
        event: boolean;
    }>>,
}

const FollowFilter: React.FC<FollowFilterProps> = ({ followingCheck, setFollowingCheck }) => {
    const onClubChecked = () => {
        setFollowingCheck(prev => ({ ...prev, club: !prev.club}))
    }

    const onEventChecked =  () => {
        setFollowingCheck(prev => ({ ...prev, event: !prev.event}))
    }

	return (
		<div>
			<FilterButton name="อีเว้นท์ที่ติดตาม" onClick={onEventChecked} checked={followingCheck.event}/>
			<FilterButton name="ชมรมที่ติดตาม" onClick={onClubChecked} checked={followingCheck.club} />
		</div>
	);
};

const FilterButton: React.FC<FilterButtonProps> = ({ name, checked, onClick }) => {
    return <button onClick={onClick} className={`mr-2 px-2 py-2 rounded-full border border-[#2F3337] text-sm ${checked && 'text-white bg-[#2F3337]'}`}>{name}</button>
}

export default FollowFilter;
