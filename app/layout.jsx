import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Property Pulse',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, property, find properties',
    icons: {
    icon: '/icon.png', 
  },
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Navbar/>
            <div>{children}</div>
            <Footer/>
        </body>
    </html>
  )
}

export default MainLayout