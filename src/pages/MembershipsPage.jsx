import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Pricing from '../sections/Pricing.jsx'
import FreeTrialForm from '../sections/FreeTrialForm.jsx'

export default function MembershipsPage({ config }) {
  const [copied, setCopied] = useState(false)
  const tillNumber = config.whatsappNumber ? config.whatsappNumber.slice(-6) : '548900'

  const copyTill = () => {
    navigator.clipboard.writeText(tillNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const comparisonFeatures = [
    { name: 'Gym Floor & Free Weights Access', starter: true, pro: true, elite: true },
    { name: 'Locker Rooms & Hot Showers', starter: true, pro: true, elite: true },
    { name: 'High-Speed Member WiFi', starter: true, pro: true, elite: true },
    { name: 'Weekly Group Classes (HIIT, Boxing, Yoga)', starter: '2/week', pro: 'Unlimited', elite: 'Unlimited + VIP' },
    { name: 'Sauna & Recovery Lounge Access', starter: false, pro: true, elite: true },
    { name: 'Dedicated Personal Training (PT)', starter: false, pro: false, elite: '4 Sessions/mo' },
    { name: 'Custom Nutrition & Meal Plan', starter: false, pro: 'Discounted', elite: 'Included' },
    { name: 'Free Guest Passes', starter: false, pro: '1/month', elite: '2/month' },
    { name: 'Freezed Days (For Travel/Injury)', starter: '14 Days/yr', pro: '30 Days/yr', elite: '60 Days/yr' },
  ]

  return (
    <main className="pt-28 pb-20 bg-bg text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
            Clear, Transparent Memberships
          </span>
          <h1 className="text-4xl sm:text-6xl font-headline font-black uppercase tracking-tight text-white mt-2 mb-4">
            Join The <span style={{ color: 'var(--primary)' }}>Pack.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Choose the membership tier designed for your goals. No sign-up fees, no locked-in long contracts, and flexible M-Pesa payments.
          </p>
        </div>

        {/* Pricing Cards Section */}
        <div className="-mt-16">
          <Pricing config={config} />
        </div>

        {/* M-Pesa Direct Payment Pill */}
        <div className="my-16 max-w-2xl mx-auto p-6 rounded-2xl border border-green-500/30 bg-surface text-center shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🟢</span>
            <h3 className="font-headline font-bold text-lg uppercase text-white">Direct M-Pesa Buy Goods & Services</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Pay directly via M-Pesa Till Number for your daily drop-in or monthly subscription:
          </p>
          <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-bg border border-border">
            <span className="text-sm font-mono text-gray-300">Till Number:</span>
            <span className="text-xl font-mono font-black text-green-400">{tillNumber}</span>
            <button
              onClick={copyTill}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-green-500 hover:bg-green-600 text-black transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Till'}
            </button>
          </div>
        </div>

        {/* Full Feature Comparison Matrix */}
        <div className="my-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-headline font-black uppercase text-white mb-2">
              Plan Comparison Matrix
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              See what’s included in every tier
            </p>
          </div>

          <div className="overflow-x-auto border border-border rounded-xl bg-surface">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-bg/60">
                  <th className="p-4 sm:p-5 font-headline font-bold uppercase text-gray-400 text-xs tracking-wider">Features</th>
                  <th className="p-4 sm:p-5 font-headline font-black uppercase text-white text-center">Starter</th>
                  <th className="p-4 sm:p-5 font-headline font-black uppercase text-primary text-center">Pro (Popular)</th>
                  <th className="p-4 sm:p-5 font-headline font-black uppercase text-white text-center">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonFeatures.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 text-gray-300 font-medium">{item.name}</td>
                    <td className="p-4 sm:p-5 text-center">
                      {typeof item.starter === 'boolean' ? (
                        item.starter ? <span className="text-green-400 font-bold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-gray-300 text-xs font-bold">{item.starter}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-primary/5">
                      {typeof item.pro === 'boolean' ? (
                        item.pro ? <span className="text-primary font-bold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-primary text-xs font-bold">{item.pro}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {typeof item.elite === 'boolean' ? (
                        item.elite ? <span className="text-green-400 font-bold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-gray-300 text-xs font-bold">{item.elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free Trial Section Embed */}
        <FreeTrialForm config={config} />
      </div>
    </main>
  )
}
