import React from 'react'
import { BsThermometerHalf, BsFillPeopleFill } from 'react-icons/bs'
import { ImDroplet } from 'react-icons/im'
import { FiRepeat } from 'react-icons/fi'
import { GiCoffeeBeans } from 'react-icons/gi'
import { MdGrain } from 'react-icons/md'

export type BrewProps = {
  id: string
}

export const Info = ({ data, Icon }) => {
  return (
    <div className="flex flex-row">
      <div style={{ width: '35px' }} className="flex justify-center">
        <Icon style={{ height: '20px' }} />
      </div>

      <span className="text-sm" style={{ width: '50px' }}>
        {data}
      </span>
    </div>
  )
}

export const BrewPreview = ({ brew }) => {
  console.log(brew)
  const waterTemp = brew.waterTemp + ' °C'
  const waterQuantity = brew.waterQuantity + ' gr'
  const coffeeQuantity = brew.coffeeQuantity + ' gr'
  const grindSize = brew.grindSize
  const cups = brew.cups || 1

  return (
    <div className="">
      <div className="my-2 flex w-auto justify-between overflow-hidden rounded-md bg-white shadow-lg">
        <div
          style={{ height: '80px', width: '80px' }}
          className="flex items-center justify-center border-r"
        >
          <img
            style={{ height: '50px' }}
            src={brew.BrewMethod.image}
            alt={brew.BrewMethod.name}
          />
        </div>
        {/* first column of data */}
        <div
          className="flex flex-col items-start justify-between px-2 py-4"
          style={{ height: '80px' }}
        >
          <Info data={waterTemp} Icon={BsThermometerHalf} />
          <Info data={waterQuantity} Icon={ImDroplet} />
        </div>
        {/* second column of data */}
        <div
          className="flex flex-col items-start justify-between px-2 py-4"
          style={{ height: '80px' }}
        >
          <Info data={coffeeQuantity} Icon={GiCoffeeBeans} />
          <Info data={grindSize} Icon={MdGrain} />
        </div>
        {/* third column of data */}
        <div
          className="flex flex-col items-start justify-between px-2 py-4"
          style={{ height: '80px' }}
        >
          <div className="flex flex-row">
            <div style={{ width: '35px' }} className="flex justify-center">
              <BsFillPeopleFill style={{ height: '20px' }} />
            </div>

            <span className="text-sm" style={{ width: '15px' }}>
              {cups}
            </span>
          </div>
        </div>
        <div
          style={{ height: '80px', width: '50px' }}
          className="flex items-center justify-center border-l"
        >
          <FiRepeat size={20} />
        </div>
      </div>
    </div>
  )
}
