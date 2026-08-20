import Hero from '../sections/Hero.jsx'
import Stats from '../sections/Stats.jsx'
import About from '../sections/About.jsx'
import Classes from '../sections/Classes.jsx'
import Schedule from '../sections/Schedule.jsx'
import Transformation from '../sections/Transformation.jsx'
import Programs from '../sections/Programs.jsx'
import Trainers from '../sections/Trainers.jsx'
import Gallery from '../sections/Gallery.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Pricing from '../sections/Pricing.jsx'
import CTA from '../sections/CTA.jsx'
import FreeTrialForm from '../sections/FreeTrialForm.jsx'
import FAQ from '../sections/FAQ.jsx'
import Contact from '../sections/Contact.jsx'
import Loader from '../components/Loader.jsx'
import Marquee from '../components/Marquee.jsx'
import Events from '../sections/Events.jsx'
import BMICalculator from '../sections/BMICalculator.jsx'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function HomePage({ config }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader for a brief period on initial mount
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader config={config} />}
      </AnimatePresence>

      <main className={loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <Hero config={config} />
        <Marquee />
        <Stats config={config} />
        <About config={config} />
        <Classes config={config} />
        <Events config={config} />
        <BMICalculator config={config} />
        <Schedule config={config} />
        <Transformation config={config} />
        <Programs config={config} />
        <Trainers config={config} />
        <Gallery config={config} />
        <Testimonials config={config} />
        <Pricing config={config} />
        <CTA config={config} />
        <FreeTrialForm config={config} />
        <FAQ config={config} />
        <Contact config={config} />
      </main>
    </>
  )
}
