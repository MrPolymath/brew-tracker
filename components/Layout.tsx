import React, { ReactNode } from 'react'
import Footer from './Footer'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div>
    <div className="min-h-screen bg-slate-50">{props.children}</div>
    <Footer />
  </div>
)

export default Layout
