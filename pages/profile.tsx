// Header.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  let left = null
  let right = null

  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex justify-center">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')} className="text-lg bold">
            Log in
          </a>
        </Link>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex justify-center">
        <button onClick={() => signOut()}>
          <a className="text-lg bold">Log out</a>
        </button>
      </div>
    )
  }
}

export default Header
