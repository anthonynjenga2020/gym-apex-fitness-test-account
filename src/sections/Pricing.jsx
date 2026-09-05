import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function Pricing({ config }) {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'annual'
  const [selectedAddons, setSelectedAddons] = useState([])
  const headerRef = useReveal()
  const cardsRef = useReveal()

  const addonsList = [
    { id: 'pt', name: 'Personal Training (4 Sessions/mo)', price: 3000 },
    { id: 'nutrition', name: 'Custom Nutrition & Macro Plan', price: 1500 },
    { id: 'locker', name: 'Dedicated Locker & Towel Service', price: 1000 },
  ]

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const item = addonsList.find(a => a.id === id)
    return sum + (item ? item.price : 0)
  }, 0)

  const getPlanPrice = (basePrice) => {
    let price = basePrice
    if (billingCycle === 'annual') {
      price = Math.round(basePrice * 0.8) // 20% discount
    }
    return price + addonTotal
  }

  return (
    <section id="pricing" className="py-28 lg:py-40" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="section-reveal text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
              Transparent Investment
            </span>
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
          </div>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight mb-4">
            Membership Plans
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base mb-8">
            No hidden fees. No lock-in contracts. Cancel anytime. M-Pesa and Card payments accepted.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-surface border border-border">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Annual Plan</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-black">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Optional Add-Ons Bar */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-xl border border-white/10 bg-surface/60 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 text-center sm:text-left">
            Customize with Optional Add-Ons:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {addonsList.map(addon => {
              const isChecked = selectedAddons.includes(addon.id)
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3 rounded-lg border text-left flex items-start justify-between gap-2 transition-all text-xs ${
                    isChecked
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-border bg-bg/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{addon.name}</span>
                  <span className="font-bold text-primary shrink-0">+{addon.price.toLocaleString()}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Plans Grid */}
        <div
          ref={cardsRef}
          className={`section-reveal grid gap-6 ${
            config.membershipPlans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } max-w-5xl mx-auto`}
        >
          {config.membershipPlans.map((plan, i) => {
            const finalPrice = getPlanPrice(plan.price)

            return (
              <div
                key={i}
                className={`relative rounded-xl border flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? 'scale-105 z-10 shadow-[0_0_80px_rgba(255,78,26,0.25)] border-primary'
                    : 'border-border hover:border-primary/40'
                }`}
                style={{
                  backgroundColor: plan.highlight ? 'var(--surface)' : 'var(--surface)',
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-lg"
                    style={{ backgroundColor: 'var(--primary)' }}>
                    ★ {plan.badge}
                  </div>
                )}

                <div className="p-8 flex-1">
                  <h3 className="font-headline font-black text-2xl uppercase tracking-wide mb-2 text-white">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm font-bold text-gray-400">
                      {plan.currency}
                    </span>
                    <span className="font-headline font-black text-5xl text-white">
                      {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400">
                      /{billingCycle === 'annual' ? 'mo (billed annually)' : plan.period}
                    </span>
                  </div>

                  <div className="h-px w-full mb-6 bg-border" />

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: 'var(--primary)' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#free-trial"
                    className={`block w-full py-4 text-center rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                      plan.highlight
                        ? 'btn-primary shadow-lg hover:shadow-primary/30'
                        : 'btn-outline hover:bg-primary hover:text-white'
                    }`}
                  >
                    Claim 7-Day Free Pass →
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note & M-Pesa support */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-gray-400 text-sm">
            All plans include unlimited gym floor access, locker rooms, showers & WiFi.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs text-gray-400">
            <span>🟢 M-Pesa Till & Paybill Accepted</span>
            <span>•</span>
            <span>Zero Sign-Up Fees</span>
          </div>
        </div>
      </div>
    </section>
  )
}
