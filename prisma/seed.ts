import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

async function main() {
  // create default brewMethods
  const aeropress = await prisma.brewMethod.upsert({
    where: { id: "aeropress" },
    update: {},
    create: {
      id: "aeropress",
      name: "Aeropress",
      image: "https://brew-tracker.vercel.app/methods/aeropress.jpg",
    },
  });

  const chemex = await prisma.brewMethod.upsert({
    where: { id: "chemex" },
    update: {},
    create: {
      id: "chemex",
      name: "Chemex",
      image: "https://brew-tracker.vercel.app/methods/chemex.jpg",
    },
  });

  const frenchPress = await prisma.brewMethod.upsert({
    where: { id: "frenchpress" },
    update: {},
    create: {
      id: "frenchpress",
      name: "French Press",
      image: "https://brew-tracker.vercel.app/methods/frenchpress.jpg",
    },
  });

  const moka = await prisma.brewMethod.upsert({
    where: { id: "moka" },
    update: {},
    create: {
      id: "moka",
      name: "Moka",
      image: "https://brew-tracker.vercel.app/methods/moka.jpg",
    },
  });

  const espresso = await prisma.brewMethod.upsert({
    where: { id: "vacuum_pot" },
    update: {},
    create: {
      id: "vacuum_pot",
      name: "Vacuum Pot",
      image: "https://brew-tracker.vercel.app/methods/vacuum_pot.jpg",
    },
  });

  const v60 = await prisma.brewMethod.upsert({
    where: { id: "v60" },
    update: {},
    create: {
      id: "v60",
      name: "V60",
      image: "https://brew-tracker.vercel.app/methods/v60.jpg",
    },
  });

  const vacuumPot = await prisma.brewMethod.upsert({
    where: { id: "vacuum_pot" },
    update: {},
    create: {
      id: "vacuum_pot",
      name: "Vacuum Pot",
      image: "https://brew-tracker.vercel.app/methods/vacuum_pot.jpg",
    },
  });

  const Flowery = await prisma.aromaFamily.upsert({
    where: { name: "Flowery" },
    update: {},
    create: {
      name: "Flowery",
      color: "#FECC46",
      aromas: {
        create: [
          {
            name: "Floral",
            color: "#FECC46",
          },
        ],
      },
    },
  });
  const Fruity = await prisma.aromaFamily.upsert({
    where: { name: "Fruity" },
    update: {},
    create: {
      name: "Fruity",
      color: "#F39200",
      aromas: {
        create: [
          {
            name: "Citrus",
            color: "#FFCB00",
          },
          {
            name: "Tropical",
            color: "#BABF70",
          },
          {
            name: "Berries",
            color: "#E5BB64",
          },
        ],
      },
    },
  });
  const Earthy = await prisma.aromaFamily.upsert({
    where: { name: "Earthy" },
    update: {},
    create: {
      name: "Earthy",
      color: "#AE9B1B",
      aromas: {
        create: [
          {
            name: "Wet Soil",
            color: "#886E31",
          },
          {
            name: "Grass / Plant",
            color: "#B9BD05",
          },
        ],
      },
    },
  });
  const Nutty = await prisma.aromaFamily.upsert({
    where: { name: "Nutty" },
    update: {},
    create: {
      name: "Nutty",
      color: "#B3772C",
      aromas: {
        create: [
          {
            name: "Nuts",
            color: "#CA9E66",
          },
        ],
      },
    },
  });
  const Caramelly = await prisma.aromaFamily.upsert({
    where: { name: "Caramelly" },
    update: {},
    create: {
      name: "Caramelly",
      color: "#C5A039",
      aromas: {
        create: [
          {
            name: "Candy",
            color: "#C35751",
          },
          {
            name: "Caramel",
            color: "#C2751B",
          },
          {
            name: "Biscuit",
            color: "#886E31",
          },
        ],
      },
    },
  });
  const Chocolatey = await prisma.aromaFamily.upsert({
    where: { name: "Chocolatey" },
    update: {},
    create: {
      name: "Chocolatey",
      color: "#683C10",
      aromas: {
        create: [
          {
            name: "Cholate",
            color: "#AF6E5B",
          },
          {
            name: "Vanilla",
            color: "#CDBA6E",
          },
        ],
      },
    },
  });
  const Resinous = await prisma.aromaFamily.upsert({
    where: { name: "Resinous" },
    update: {},
    create: {
      name: "Resinous",
      color: "#659EC6",
      aromas: {
        create: [
          {
            name: "Medicinal",
            color: "#95C5D9",
          },
        ],
      },
    },
  });
  const Spicy = await prisma.aromaFamily.upsert({
    where: { name: "Spicy" },
    update: {},
    create: {
      name: "Spicy",
      color: "#4B6D8B",
      aromas: {
        create: [
          {
            name: "Warming",
            color: "#745D55",
          },
          {
            name: "Pungent",
            color: "#4B577D",
          },
        ],
      },
    },
  });
  const Carbony = await prisma.aromaFamily.upsert({
    where: { name: "Carbony" },
    update: {},
    create: {
      name: "Carbony",
      color: "#58626F",
      aromas: {
        create: [
          {
            name: "Smoky",
            color: "#586366",
          },
          {
            name: "Ashy",
            color: "#7D8C92",
          },
        ],
      },
    },
  });

  const chocolateAroma = await prisma.aroma.findUnique({
    where: { name: "Cholate" },
  });
  const dani = await prisma.user.upsert({
    where: { email: "danielcarmona55@gmail.com" },
    update: {},
    create: {
      email: "danielcarmona55@gmail.com",
      image: "https://avatars.githubusercontent.com/u/15792218?v=4",
      name: "Daniel Carmona",
    },
  });

  const firstBrew = await prisma.brew.create({
    data: {
      smellIntensity: 3,
      smellQuality: 7,
      acidity: 5,
      sweetness: 8,
      bitterness: 3,
      body: 4,
      finish: "dry",
      score: 8,
      time: 150,
      aromas: {
        connect: [{ id: chocolateAroma.id }],
      },
      BrewMethod: {
        connect: { id: aeropress.id },
      },
      User: {
        connect: { id: dani.id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
