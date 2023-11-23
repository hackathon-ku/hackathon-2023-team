import React from 'react'

interface TagProps {
    tagName: string,
    color: string
}

const Tag = ({ tagName, color }: TagProps) => {
  return (
    <div className={`flex w-fit justify-center py-1 px-2 rounded-full ${color} text-white font-light text-sm`} style={{ backgroundColor: color.slice(4, -1)}}>
        {tagName}
    </div>
  )
}

export default Tag