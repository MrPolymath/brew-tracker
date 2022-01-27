import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

// POST /api/post
export default async function handle(req, res) {
  const session = await getSession({ req })
  const aromas = req.body.aromas.map((aroma) => ({
    name: aroma.name,
  }))
  const flavors = req.body.flavors.map((flavor) => ({
    name: flavor.name,
  }))
  const result = await prisma.brew.create({
    data: {
      cups: req.body.cups,
      waterTemp: req.body.waterTemp,
      grindSize: req.body.grindSize,
      coffeeQuantity: req.body.coffeeQuantity,
      waterQuantity: req.body.waterQuantity,
      smellIntensity: req.body.smellIntensity,
      flavorIntensity: req.body.flavorIntensity,
      acidity: req.body.acidity,
      sweetness: req.body.sweetness,
      bitterness: req.body.bitterness,
      body: req.body.body,
      finish: req.body.finish,
      score: req.body.score,
      time: req.body.time,
    },
  })
  const update = await prisma.brew.update({
    where: { id: result.id },
    data: {
      aromas: {
        connect: aromas,
      },
      flavors: { connect: flavors },
      User: { connect: { email: session?.user?.email } },
      Coffee: { connect: { id: req.body.Coffee } },
      BrewMethod: { connect: { id: req.body.BrewMethod } },
    },
  })

  res.json(update)
}
