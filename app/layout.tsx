import NavBar from '@/components/navbar';
import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets:['latin']
})

export const metadata: Metadata = {
  title: 'Stackoverflow-clone',
  description: 'simple project for alx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <html lang="en">
      
      <body className={dmSans.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
