import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
// import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import Dropdown from 'react-dropdown'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'react-dropdown/style.css'
import Link from 'next/link'
import Aromas, { aromaType } from '../../components/NewBrewAromas'
import { Modal } from './../../components/Modal'
import { scrollIntoView } from 'react-select/dist/declarations/src/utils'

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
    return { props: { loggedOut: true } }
  }

  const brewMethods = await prisma.brewMethod.findMany({
    where: {},
  })
  const coffees = await prisma.coffee.findMany({
    where: {
      User: { email: session.user.email },
    },
  })
  const aromas = await prisma.aroma.findMany({
    where: {},
  })
  const flavors = await prisma.flavor.findMany({
    where: {},
  })
  return {
    props: { brewMethods, coffees, aromas, flavors },
  }
}

const NewBrew = (props) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status !== 'authenticated') {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-xl font-bold">
        <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </div>
    )
  } else {
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
    const [finish, setFinish] = useState('')
    const [smellIntensity, setSmellIntensity] = useState(5)
    const [selectedAromas, setSelectedAromas] = useState([])
    const [score, setScore] = useState(5)
    const selectedAromasString = selectedAromas
      .map((aroma) => aroma.label)
      .join(', ')
    const [flavorIntensity, setFlavorIntensity] = useState(5)
    const [selectedFlavors, setSelectedFlavors] = useState([])
    const selectedFlavorsString = selectedFlavors
      .map((flavor) => flavor.label)
      .join(', ')

    const brewMethod = props.brewMethods.find((m) => m.id === brewMethodName)
    const brewOptions = props.brewMethods.map((m) => ({
      value: m.id,
      label: m.name,
    }))
    const coffeeOptions = props.coffees.map((coffee) => ({
      value: coffee.id,
      label: coffee.name,
    }))

    const handleSelectAroma = (aroma: aromaType) => {
      if (selectedAromas.includes(aroma)) {
        setSelectedAromas(selectedAromas.filter((a) => a.id !== aroma.id))
      } else {
        setSelectedAromas([...selectedAromas, aroma])
      }
    }

    const handleSelectFlavor = (flavor: aromaType) => {
      if (selectedFlavors.includes(flavor)) {
        setSelectedFlavors(selectedFlavors.filter((a) => a.id !== flavor.id))
      } else {
        setSelectedFlavors([...selectedFlavors, flavor])
      }
    }

    const submitBrew = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      try {
        const reqBody = {
          cups: cups,
          waterTemp: waterTemperature,
          grindSize: grindSize,
          coffeeQuantity: coffeeQuantity,
          waterQuantity: waterQuantity,
          smellIntensity: smellIntensity,
          flavorIntensity: flavorIntensity,
          acidity: acidity,
          sweetness: sweetness,
          bitterness: bitterness,
          body: body,
          finish: finish,
          score: score,
          time: time,
          flavors: selectedFlavors,
          aromas: selectedAromas,
          Coffee: coffee,
          BrewMethod: brewMethodName,
        }
        await fetch('/api/newbrew', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
        })
        await Router.push('/')
      } catch (err) {
        console.error(err)
      }
    }

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
          <p className="mb-0 font-bold text-slate-700">Finish:</p>
          <div className="mb-2 px-0">
            <input
              type="text"
              placeholder="Finishing Taste"
              className="w-full rounded-sm border-2 border-slate-300 p-1 px-2"
              style={{ height: '40px' }}
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
            />
          </div>
          <p className="mb-0 font-bold text-slate-700">Aromas:</p>
          <div className="mb-2 px-0">
            <Link href="/newbrew?aromas=true">
              <input
                type="text"
                placeholder="Click to select Aromas"
                className="w-full rounded-sm border-2 border-slate-300 p-1 px-2"
                style={{ height: '40px' }}
                value={selectedAromasString}
                readOnly
              />
            </Link>
          </div>
          <p className="mb-0 font-bold text-slate-700">Aroma Intensity:</p>
          <div className="mb-2 px-0">
            <Slider
              value={smellIntensity}
              onChange={(value) => setSmellIntensity(value)}
              {...sliderProps}
            />
          </div>
          <p className="mb-0 font-bold text-slate-700">Flavors:</p>
          <div className="mb-2 px-0">
            <Link href="/newbrew?flavors=true">
              <input
                type="text"
                placeholder="Click to select Flavors"
                className="w-full rounded-sm border-2 border-slate-300 p-1 px-2"
                style={{ height: '40px' }}
                value={selectedFlavorsString}
                readOnly
              />
            </Link>
          </div>
          <p className="mb-0 font-bold text-slate-700">Flavor Intensity:</p>
          <div className="mb-2 px-0">
            <Slider
              value={flavorIntensity}
              onChange={(value) => setFlavorIntensity(value)}
              {...sliderProps}
            />
          </div>
          <p className="mb-0 font-bold text-slate-700">Overall Score:</p>
          <div className="mb-2 px-0">
            <Slider
              value={score}
              onChange={(value) => setScore(value)}
              {...sliderProps}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="mt-5 w-full rounded-md bg-slate-700 py-2 px-4 font-bold text-white"
          onClick={submitBrew}
        >
          Save Brew
        </button>
        {/* MODALS */}
        {router.query.aromas && (
          <Modal
            onClose={() => {
              router.push('/newbrew')
            }}
          >
            <Aromas
              aromas={props.aromas}
              handleClick={handleSelectAroma}
              selectedAromas={selectedAromas}
            />
          </Modal>
        )}
        {router.query.flavors && (
          <Modal
            onClose={() => {
              router.push('/newbrew')
            }}
          >
            <Aromas
              aromas={props.flavors}
              handleClick={handleSelectFlavor}
              selectedAromas={selectedFlavors}
            />
          </Modal>
        )}
      </div>
    )
  }
}

export default NewBrew
