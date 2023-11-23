import React from "react";

interface TagProps {
	tagName: string;
	color: string;
}

const Tag = ({ tagName, color }: TagProps) => {
  
  return (
    <div 
      className={`flex w-fit justify-center py-[3px] px-[10px] rounded-full ${color} text-white font-light text-[12px]`} 
      style={{ backgroundColor: color.slice(4, -1)}}
    >
        {tagName}
    </div>
  )
}

export default Tag;
