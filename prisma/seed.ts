import { PrismaClient } from '@prisma/client'
import { flavors } from './flavors'

const prisma = new PrismaClient()

async function main() {
  // create default brewMethods
  const aeropress = await prisma.brewMethod.upsert({
    where: { id: 'aeropress' },
    update: {},
    create: {
      id: 'aeropress',
      name: 'Aeropress',
      image: 'https://brew-tracker.vercel.app/methods/aeropress.jpg',
    },
  })

  const chemex = await prisma.brewMethod.upsert({
    where: { id: 'chemex' },
    update: {},
    create: {
      id: 'chemex',
      name: 'Chemex',
      image: 'https://brew-tracker.vercel.app/methods/chemex.jpg',
    },
  })

  const frenchPress = await prisma.brewMethod.upsert({
    where: { id: 'frenchpress' },
    update: {},
    create: {
      id: 'frenchpress',
      name: 'French Press',
      image: 'https://brew-tracker.vercel.app/methods/frenchpress.jpg',
    },
  })

  const moka = await prisma.brewMethod.upsert({
    where: { id: 'moka' },
    update: {},
    create: {
      id: 'moka',
      name: 'Moka',
      image: 'https://brew-tracker.vercel.app/methods/moka.jpg',
    },
  })

  const espresso = await prisma.brewMethod.upsert({
    where: { id: 'vacuum_pot' },
    update: {},
    create: {
      id: 'vacuum_pot',
      name: 'Vacuum Pot',
      image: 'https://brew-tracker.vercel.app/methods/vacuum_pot.jpg',
    },
  })

  const v60 = await prisma.brewMethod.upsert({
    where: { id: 'v60' },
    update: {},
    create: {
      id: 'v60',
      name: 'V60',
      image: 'https://brew-tracker.vercel.app/methods/v60.jpg',
    },
  })

  const vacuumPot = await prisma.brewMethod.upsert({
    where: { id: 'vacuum_pot' },
    update: {},
    create: {
      id: 'vacuum_pot',
      name: 'Vacuum Pot',
      image: 'https://brew-tracker.vercel.app/methods/vacuum_pot.jpg',
    },
  })

  const prismaFlavors = flavors.map(async (f, i) => {
    await prisma.aroma.upsert({
      where: { name: f.id },
      update: {},
      create: {
        name: f.id,
        label: f.name,
        color: f.color,
      },
    })
    await prisma.flavor.upsert({
      where: { name: f.id },
      update: {},
      create: {
        name: f.id,
        label: f.name,
        color: f.color,
      },
    })
  })

  const dani = await prisma.user.upsert({
    where: { email: 'danielcarmona55@gmail.com' },
    update: {},
    create: {
      email: 'danielcarmona55@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/15792218?v=4',
      name: 'Daniel Carmona',
    },
  })

  const simbaCoffee = await prisma.coffee.create({
    data: {
      name: 'SIMBA',
      roastDate: new Date(Date.now()).toISOString(),
      origin: 'Kenia',
      process: 'Washed',
      roaster: 'Hidden',
      variety: 'SL28 and SL34',
      producer: 'Mercy Murathe',
      screenSize: '16/18',
      User: {
        connect: {
          id: dani.id,
        },
      },
    },
  })

  const firstBrew = await prisma.brew.create({
    data: {
      waterTemp: 100,
      grindSize: 30,
      coffeeQuantity: 11,
      smellIntensity: 3,
      flavorIntensity: 5,
      acidity: 5,
      sweetness: 8,
      bitterness: 3,
      body: 4,
      finish: 'dry',
      score: 8,
      time: 150,
      aromas: {
        connect: [{ name: 'chocolate' }],
      },
      flavors: {
        connect: [{ name: 'chocolate' }],
      },
      BrewMethod: {
        connect: { id: aeropress.id },
      },
      User: {
        connect: { id: dani.id },
      },
      Coffee: {
        connect: { id: simbaCoffee.id },
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
