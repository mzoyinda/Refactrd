import Footer from '@/components/layout/Footer'
import { Benefits } from '@/components/sections/about/Benefits'
import { MissionVision } from '@/components/sections/about/MissionVision'
import { WhoWeAre } from '@/components/sections/about/WhoWeAre'
import { FAQ } from '@/components/sections/FAQ'
import React from 'react'

export default function AboutPage() {
  return (
    <>
    <WhoWeAre/>
    <MissionVision/>
    <Benefits/>
    <FAQ/>
    <Footer/>
    </>
  )
}

