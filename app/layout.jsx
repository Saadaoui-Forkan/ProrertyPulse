import React from 'react'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Property Pulse',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, property, find properties',
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout