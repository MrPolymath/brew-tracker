import React from 'react'
import Link from 'next/link'

const NewBrewButton = () => {
  return (
    <Link href="/newbrew">
      <button className="w-full rounded-md bg-slate-200 py-2 px-4 font-bold text-slate-800 hover:bg-slate-300">
        NEW BREW
      </button>
    </Link>
  )
}

export default NewBrewButton
