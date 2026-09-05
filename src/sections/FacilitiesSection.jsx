import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'

export default function FacilitiesSection({ config }) {
  const headerRef = useReveal()
  const [activeZone, setActiveZone] = useState(0)

  const ZONES = [
    {
      id: 'weights',
      title: 'Heavy Strength & Iron Zone',
      subtitle: 'Olympic standard barbells & powerlifting cages',
      image: '/gym (1).jpg',
      specs: ['Eleiko Olympic Competition Barbells', 'Dumbbells from 2.5kg up to 60kg', '4 Dedicated Deadlift Platforms', '8 Rogue Power Cages & Squat Stations'],
      vibe: 'Raw iron, calibrated plates, chalk-friendly atmosphere.',
    },
    {
      id: 'cardio',
      title: 'Endurance & Cardio Theater',
      subtitle: 'Premium conditioning equipment with smart tracking',
      image: '/gym (7).jpg',
      specs: ['Concept2 Rowers & SkiErgs', 'Assault AirBikes & Echo Bikes', 'Woodway Curved Self-Powered Treadmills', 'StairMasters with panoramic city views'],
      vibe: 'High airflow ventilation, heart-rate sync, individual screens.',
    },
    {
      id: 'boxing',
      title: 'Combat & Boxing Arena',
      subtitle: 'Heavy bags and professional boxing ring',
      image: '/gym (9).jpg',
      specs: ['16ft Championship Boxing Ring', '10 Heavy Leather Punching Bags', 'Speed Bags & Double-End Balls', 'High-density impact flooring for MMA'],
      vibe: 'Authentic fight conditioning, gloves & wraps provided.',
    },
    {
      id: 'functional',
      title: 'Functional Turf & CrossFit Track',
      subtitle: '30-meter indoor sprint turf & functional rigs',
      image: '/gym (4).jpg',
      specs: ['30m Sled & Prowler Turf Track', 'Climbing Ropes & Gymnastic Rings', 'Competition Kettlebells (8kg to 48kg)', 'Soft Plyo Boxes & Slam Balls'],
      vibe: 'Open space, explosive movements, high-energy team vibes.',
    },
    {
      id: 'recovery',
      title: 'Recovery & Thermal Suite',
      subtitle: 'Accelerate muscular repair and lower inflammation',
      image: '/gym (11).jpg',
      specs: ['Traditional Cedar Wood Sauna (85°C)', 'Cold Plunge Immersion Barrels (8°C)', 'Theragun Percussion Massage Station', 'Luxury Private Showers & Towel Service'],
      vibe: 'Peaceful, immaculate hygiene, steam & infrared relaxation.',
    },
  ]

  const current = ZONES[activeZone]

  return (
    <section id="facilities" className="py-28 lg:py-40 relative bg-bg text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="section-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
                World-Class Facility
              </span>
            </div>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight">
              Tour Our <span style={{ color: 'var(--primary)' }}>Zones.</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl">
              15,000+ sq ft of purpose-built training zones. Maintained to the highest hygiene and safety standards.
            </p>
          </div>
          <a href="#free-trial" className="btn-primary px-6 py-3 rounded-sm text-sm self-start lg:self-auto shrink-0">
            Book Facility Walkthrough →
          </a>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(idx)}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeZone === idx
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-surface text-gray-400 border-border hover:text-white'
              }`}
            >
              {zone.title.split(' ')[0]} {zone.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Active Zone Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-2xl border border-white/10 bg-surface shadow-2xl"
          >
            {/* Left: Image Showcase */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10] bg-black">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur text-white font-mono uppercase tracking-wider">
                  Zone {activeZone + 1} of 5
                </span>
                <span className="text-gray-300 italic">{current.vibe}</span>
              </div>
            </div>

            {/* Right: Info & Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Equipment Standard
                </span>
                <h3 className="text-3xl font-headline font-black uppercase text-white mt-1 mb-2">
                  {current.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {current.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-300">
                  Featured Specifications:
                </p>
                {current.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <span className="text-xs font-black text-white">✓</span>
                    </div>
                    <span className="text-sm text-gray-200 font-medium">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Want to test this zone?</span>
                <a
                  href="#free-trial"
                  className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                >
                  Claim 7-Day Access Pass →
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
