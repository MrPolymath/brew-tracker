import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

export type aromaType = {
  id: string
  name: string
  label: string
  color: string
}

const Aromas = ({ aromas, handleClick, selectedAromas }) => {
  return (
    <div className="shadow-lge h-full w-full bg-slate-700 p-2 pb-0">
      {aromas.map((aroma: aromaType) => (
        <div
          key={aroma.id}
          className="relative mb-2 flex justify-center p-1 font-semibold tracking-wider text-slate-900"
          style={{ backgroundColor: aroma.color }}
          onClick={() => handleClick(aroma)}
        >
          <span>{aroma.label}</span>
          <div className="absolute right-2">
            {selectedAromas.filter((a) => a.id === aroma.id).length ? (
              <ImCheckboxChecked className="h-6 w-6" />
            ) : (
              <ImCheckboxUnchecked className="h-6 w-6" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Aromas
