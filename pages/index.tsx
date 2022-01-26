import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { BrewProps, BrewPreview } from '../components/Brew'
import { useSession, getSession } from 'next-auth/react'
import prisma from '../lib/prisma'
import NewBrewButton from '../components/NewBrewButton'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { brews: [] } }
  }

  const brews = await prisma.brew.findMany({
    where: {
      User: { email: session.user.email },
    },
    include: {
      BrewMethod: true,
    },
  })
  console.log('brews', brews)
  return {
    props: { brews },
  }
}

// type Props = {
//   brews: BrewProps[]
// }

const Brews = (props) => {
  const { data: session } = useSession()
  // console.log(props)
  if (!session) {
    return (
      <Layout>
        <h1>My Brews</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <head>
        <title>Brew Tracker</title>
        <meta name="description" content="App to track your coffee brews" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="p-5">
        {/* TITLE AND FILTERS */}
        <div className="flex justify-end">
          <span className="mb-3 text-xl font-bold">My Brews</span>
        </div>
        <main>
          <div className="flex justify-center">
            <NewBrewButton />
          </div>
          {props.brews.map((brew) => (
            <div key={brew.id} className="w-full">
              <BrewPreview brew={brew} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Brews
