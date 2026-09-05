import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function CrowdMeterWidget() {
  const currentHour = new Date().getHours()

  // Peak curve simulation
  const hoursData = useMemo(() => {
    return [
      { hour: '6 AM', level: 65, status: 'Moderate' },
      { hour: '7 AM', level: 85, status: 'Peak' },
      { hour: '8 AM', level: 75, status: 'Moderate' },
      { hour: '10 AM', level: 40, status: 'Quiet' },
      { hour: '12 PM', level: 55, status: 'Moderate' },
      { hour: '2 PM', level: 30, status: 'Quiet' },
      { hour: '4 PM', level: 60, status: 'Moderate' },
      { hour: '6 PM', level: 90, status: 'Peak' },
      { hour: '7 PM', level: 85, status: 'Peak' },
      { hour: '8 PM', level: 50, status: 'Quiet' },
    ]
  }, [])

  // Calculate live capacity based on current hour
  const currentCapacity = useMemo(() => {
    if (currentHour >= 17 && currentHour <= 20) return { percent: 85, text: 'Peak Hours', color: '#FF4E1A' }
    if (currentHour >= 6 && currentHour <= 8) return { percent: 75, text: 'Morning Rush', color: '#FFB800' }
    if (currentHour >= 11 && currentHour <= 14) return { percent: 50, text: 'Moderate', color: '#3B82F6' }
    if (currentHour >= 21 || currentHour < 5) return { percent: 10, text: 'Closed / Off-Peak', color: '#6B7280' }
    return { percent: 35, text: 'Quiet & Open Racks', color: '#10B981' }
  }, [currentHour])

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-surface text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentCapacity.color }} />
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
              Live Gym Meter
            </span>
          </div>
          <h3 className="text-xl font-headline font-black uppercase">
            Current Floor Capacity
          </h3>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto p-2.5 rounded-xl bg-bg border border-border">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: currentCapacity.color }}>
              {currentCapacity.text}
            </p>
            <p className="text-[10px] text-gray-500 uppercase">Real-time status</p>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm text-white" style={{ backgroundColor: currentCapacity.color }}>
            {currentCapacity.percent}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-bg border border-border overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${currentCapacity.percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: currentCapacity.color }}
        />
      </div>

      {/* Hourly Histogram */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Typical Hourly Traffic (Monday – Friday)
        </p>
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 items-end h-24 pt-4 border-b border-border pb-2">
          {hoursData.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 group relative h-full justify-end">
              {/* Tooltip */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-1.5 py-0.5 rounded text-[9px] font-bold bg-white text-black whitespace-nowrap z-20 shadow">
                {h.level}% ({h.status})
              </div>
              <div
                className="w-full rounded-t-sm transition-all group-hover:opacity-100"
                style={{
                  height: `${h.level}%`,
                  backgroundColor: h.level > 80 ? 'var(--primary)' : h.level > 50 ? '#FFB800' : '#10B981',
                  opacity: 0.75,
                }}
              />
              <span className="text-[9px] text-gray-500 font-mono scale-90 sm:scale-100">{h.hour.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
