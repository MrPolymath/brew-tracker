import React, { ReactNode } from 'react'
// import Header from './Header'
import Footer from './Footer'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div>
    {/* <Header /> */}
    <div className="min-h-screen bg-slate-50">{props.children}</div>
    <Footer />
  </div>
)

export default Layout
