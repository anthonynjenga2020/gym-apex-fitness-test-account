import { Link } from 'react-router-dom'
import FacilitiesSection from '../sections/FacilitiesSection.jsx'
import CrowdMeterWidget from '../components/CrowdMeterWidget.jsx'
import Gallery from '../sections/Gallery.jsx'

export default function FacilitiesPage({ config }) {
  const amenities = [
    { title: 'Free Member Parking', desc: 'Secure basement & ground-level parking with 24/7 security.', icon: '🚗' },
    { title: 'Luxury Showers & Lockers', desc: 'Hot rainfall showers, digital lockers & free towel service.', icon: '🚿' },
    { title: 'Purified Water Stations', desc: 'Touchless filtered alkaline & cold water hydration stations.', icon: '💧' },
    { title: 'Medical Grade Airflow', desc: 'Hospital-grade HEPA ventilation and climate control.', icon: '💨' },
    { title: 'Smoothie & Fuel Bar', desc: 'Fresh protein shakes, pre-workouts and cold-pressed juices.', icon: '🥤' },
    { title: 'High-Speed Member WiFi', desc: 'Fiber-optic WiFi coverage across the entire training floor.', icon: '📶' },
  ]

  return (
    <main className="pt-28 pb-20 bg-bg text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
            World-Class Training Ground
          </span>
          <h1 className="text-4xl sm:text-6xl font-headline font-black uppercase tracking-tight text-white mt-2 mb-4">
            Our <span style={{ color: 'var(--primary)' }}>Facilities.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Designed from the ground up for peak human performance. Take a virtual walkthrough of our zones and premium amenities.
          </p>
        </div>

        {/* Live Crowd Meter */}
        <div className="max-w-4xl mx-auto mb-16">
          <CrowdMeterWidget />
        </div>

        {/* Interactive Zone Showcase */}
        <div className="-mt-16">
          <FacilitiesSection config={config} />
        </div>

        {/* Amenities Grid */}
        <div className="my-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-black uppercase text-white mb-2">
              Facility Amenities
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Everything you need before, during, and after your workout
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-surface hover:border-primary/50 transition-all group"
              >
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h3 className="font-headline font-bold text-lg uppercase text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Embed */}
        <Gallery config={config} />
      </div>
    </main>
  )
}
