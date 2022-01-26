import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import Dropdown from 'react-dropdown'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'react-dropdown/style.css'

const sliderProps = {
  marks: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
  },
  min: 0,
  max: 10,
  handleStyle: {
    width: '20px',
    height: '20px',
    marginTop: '-8px',
    borderColor: '#6F4E37',
    backgroundColor: '#6F4E37',
  },
  trackStyle: { backgroundColor: '#f0b790', borderRadius: '0px' },
  dotStyle: {
    border: 'none',
    backgroundColor: '#ba8d70',
    height: '4px',
    width: '4px',
    marginBottom: '2px',
    borderRadius: '0px',
  },
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { brews: [] } }
  }

  const brewMethods = await prisma.brewMethod.findMany({
    where: {},
  })
  const coffees = await prisma.coffee.findMany({
    where: {
      User: { email: session.user.email },
    },
  })
  return {
    props: { brewMethods, coffees },
  }
}

const NewBrew = (props) => {
  const [brewMethodName, setBrewMethodName] = useState('aeropress')
  const [waterQuantity, setWaterQuantity] = useState(100)
  const [waterTemperature, setWaterTemperature] = useState(95)
  const [coffeeQuantity, setCoffeeQuantity] = useState(11)
  const [grindSize, setGrindSize] = useState(30)
  const [time, setTime] = useState(150)
  const [cups, setCups] = useState(1)
  const [coffee, setCoffee] = useState(null)
  const [acidity, setAcidity] = useState(5)
  const [sweetness, setSweetness] = useState(5)
  const [bitterness, setBitterness] = useState(5)
  const [body, setBody] = useState(5)

  const brewMethod = props.brewMethods.find((m) => m.id === brewMethodName)
  const brewOptions = props.brewMethods.map((m) => ({
    value: m.id,
    label: m.name,
  }))
  const coffeeOptions = props.coffees.map((coffee) => ({
    value: coffee.id,
    label: coffee.name,
  }))
  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <p className="mb-2 text-2xl font-bold text-slate-700">Brewing</p>
      <div className="mb-5 rounded-md bg-white p-2 pb-5 shadow-lg">
        {/* BREWING METHOD */}
        <div className="mb-3 flex justify-between">
          <div>
            <p className="mb-0 font-bold text-slate-700">Method:</p>
            <Dropdown
              options={brewOptions}
              value={brewMethodName}
              onChange={(value) => setBrewMethodName(value.value)}
              controlClassName="dropdown"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-lg font-bold">
            <img src={brewMethod.image} alt="" width="60px" />
          </div>
        </div>
        {/* WATER */}
        <div className="mb-2 flex justify-between">
          <div>
            <p className="mb-0 font-bold text-slate-700">Water (gr):</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={waterQuantity}
              onChange={(e) => setWaterQuantity(parseInt(e.target.value))}
            />
          </div>
          <div>
            <p className="mb-0 font-bold text-slate-700">Water Temp (°C):</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={waterTemperature}
              onChange={(e) => setWaterTemperature(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/* COFFEE */}
        <div className="mb-2 flex justify-between ">
          <div>
            <p className="mb-0 font-bold text-slate-700">Coffee (gr):</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={coffeeQuantity}
              onChange={(e) => setCoffeeQuantity(parseInt(e.target.value))}
            />
          </div>
          <div>
            <p className="mb-0 font-bold text-slate-700">Grind Size:</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={grindSize}
              onChange={(e) => setGrindSize(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/* TIME AND CUPS */}
        <div className="mb-2 flex justify-between">
          <div>
            <p className="mb-0 font-bold text-slate-700">Time (s):</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
            />
          </div>
          <div>
            <p className="mb-0 font-bold text-slate-700">Cups:</p>
            <input
              type="number"
              className="rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ width: '140px', height: '40px' }}
              value={cups}
              onChange={(e) => setCups(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <p className="mb-0 font-bold text-slate-700">Coffee:</p>
          <Dropdown
            options={coffeeOptions}
            value={coffee}
            onChange={(value) => setCoffee(value.value)}
            controlClassName="dropdown"
          />
        </div>
      </div>
      {/* TASTING */}
      <p className="mb-2 text-2xl font-bold text-slate-700">Tasting</p>
      <div className="rounded-md bg-white p-2 pb-5 shadow-lg">
        <p className="mb-0 font-bold text-slate-700">Acidity:</p>
        <div className="mb-2 px-0">
          <Slider
            value={acidity}
            onChange={(value) => setAcidity(value)}
            {...sliderProps}
          />
        </div>
        <p className="mb-0 font-bold text-slate-700">Sweetness:</p>
        <div className="mb-2 px-0">
          <Slider
            value={sweetness}
            onChange={(value) => setSweetness(value)}
            {...sliderProps}
          />
        </div>
        <p className="mb-0 font-bold text-slate-700">Bitterness:</p>
        <div className="mb-2 px-0">
          <Slider
            value={bitterness}
            onChange={(value) => setBitterness(value)}
            {...sliderProps}
          />
        </div>
        <p className="mb-0 font-bold text-slate-700">Body:</p>
        <div className="mb-2 px-0">
          <Slider
            value={body}
            onChange={(value) => setBody(value)}
            {...sliderProps}
          />
        </div>
      </div>
    </div>
  )
}

export default NewBrew
