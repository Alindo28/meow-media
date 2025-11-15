import React from 'react'

const SidebarCard = ({ data }) => {
  const { isSelected, avatar, name } = data

  return (
    <div
      className={`flex items-center w-full gap-3 p-[10px] rounded-lg cursor-pointer transition-all
        ${isSelected ? 'bg-primary/20' : 'hover:bg-primary/10'}
      `}
    >
      <img
        className="h-[40px] w-[40px] rounded-full object-cover"
        src={avatar ? avatar : null}
        alt={name}
      />
      <div className="text-lg font-medium">{name || 'Unnamed user'}</div>
    </div>
  )
}

export default SidebarCard
