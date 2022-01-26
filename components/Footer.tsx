import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaCoffee, FaBook } from 'react-icons/fa'
import { GiCoffeeBeans } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'

const Footer: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname
  return (
    <div className="fixed inset-x-0 bottom-0 flex flex-row bg-slate-50">
      <Link href="/">
        <div
          className={`flex h-20 basis-1/4 flex-col items-center justify-center border-2 ${
            isActive('/') ? 'bg-slate-200' : ''
          }`}
        >
          <FaCoffee className="h-8 w-8" />
          <a className="text-md font-bold text-slate-800">BREWS</a>
        </div>
      </Link>
      <Link href="/coffees">
        <div
          className={`flex h-20 basis-1/4 flex-col items-center justify-center border-2 border-l-0 ${
            isActive('/coffees') ? 'bg-slate-200' : ''
          }`}
          data-active={isActive('/coffees')}
        >
          <GiCoffeeBeans className="my-1 h-6 w-6" />
          <a className="text-md font-bold text-slate-800">COFFEES</a>
        </div>
      </Link>
      <Link href="/recipes">
        <div
          className={`flex h-20 basis-1/4 flex-col items-center justify-center border-2 border-l-0 ${
            isActive('/recipes') ? 'bg-slate-200' : ''
          }`}
          data-active={isActive('/recipes')}
        >
          <FaBook className="my-1 h-6 w-6" />
          <a className="text-md font-bold text-slate-800">RECIPES</a>
        </div>
      </Link>
      <Link href="/profile">
        <div
          className={`flex h-20 basis-1/4 flex-col items-center justify-center border-2 border-l-0 ${
            isActive('/profile') ? 'bg-slate-200' : ''
          }`}
          data-active={isActive('/profile')}
        >
          <CgProfile className="h-8 w-8" />
          <a className="text-md font-bold text-slate-800">PROFILE</a>
        </div>
      </Link>
    </div>
  )
}

export default Footer
