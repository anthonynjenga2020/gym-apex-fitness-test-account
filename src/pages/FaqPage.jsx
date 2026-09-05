import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function FaqPage({ config }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState(0)

  const ALL_FAQS = [
    {
      category: 'trials',
      q: 'How does the 7-day free trial work?',
      a: 'Your 7-day trial gives you 100% unlimited access to all group classes, weight training areas, cardio machines, and locker facilities with zero commitment. No credit card is required to sign up. Simply fill out our website form or send us a WhatsApp message to book your start date.',
    },
    {
      category: 'memberships',
      q: 'Can I pay via M-Pesa or do you require monthly recurring card billing?',
      a: 'We accept M-Pesa (Buy Goods Till & Paybill), card payments, and direct bank transfers. You can pay month-to-month without being forced into an automatic bank deduction or long-term contract.',
    },
    {
      category: 'memberships',
      q: 'Can I freeze my membership if I travel or get injured?',
      a: 'Yes! All Pro and Elite memberships include freeze privileges (up to 30 to 60 days per calendar year). Just inform us via WhatsApp 48 hours prior to your travel dates.',
    },
    {
      category: 'classes',
      q: 'Do I need prior fitness or lifting experience to join group classes?',
      a: 'Not at all. Every class is scalable for beginners, intermediate athletes, and advanced lifters. Our coaches demonstrate modifications for every exercise so you can train safely at your own pace.',
    },
    {
      category: 'classes',
      q: 'How do I reserve a spot in popular classes like HIIT or Boxing?',
      a: 'You can book directly from our online weekly timetable, or send a quick WhatsApp to our front desk. We cap class sizes to ensure personalized coaching attention.',
    },
    {
      category: 'training',
      q: 'How does 1-on-1 Personal Training work?',
      a: 'Our certified head coaches build a custom training protocol and nutrition guide based on your body composition assessment. Sessions are 60 minutes and include progressive tracking.',
    },
    {
      category: 'facilities',
      q: 'Is parking available at the gym?',
      a: 'Yes, we provide dedicated free parking for members in the basement and secure ground lot with 24/7 CCTV surveillance and security guards.',
    },
    {
      category: 'facilities',
      q: 'What should I bring for my first workout session?',
      a: 'Bring comfortable workout clothes, training shoes (flat shoes recommended for lifting), a water bottle, and a sweat towel. We provide shower towels, lockers, and filtered hydration stations.',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'trials', label: 'Free Trial & Joining' },
    { id: 'memberships', label: 'Memberships & Payments' },
    { id: 'classes', label: 'Classes & Timetable' },
    { id: 'training', label: 'Personal Training' },
    { id: 'facilities', label: 'Facilities & Parking' },
  ]

  const filteredFaqs = ALL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="pt-28 pb-20 bg-bg text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
            Help & Knowledge Base
          </span>
          <h1 className="text-4xl sm:text-6xl font-headline font-black uppercase tracking-tight text-white mt-2 mb-4">
            Frequently Asked <span style={{ color: 'var(--primary)' }}>Questions.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about joining, our classes, pricing, and facilities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions (e.g., trial, M-Pesa, parking, classes)..."
              className="w-full bg-surface border border-border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm shadow-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-surface text-gray-400 border-border hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-gray-400 text-sm">No matching questions found.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('all') }}
                className="mt-3 text-xs font-bold uppercase text-primary hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-surface overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-headline font-bold text-base uppercase text-white hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary font-black text-xl shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 text-sm text-gray-300 leading-relaxed border-t border-border/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })
          )}
        </div>

        {/* WhatsApp Help Box */}
        <div className="p-8 rounded-2xl border border-green-500/30 bg-surface text-center shadow-xl">
          <span className="text-3xl block mb-2">💬</span>
          <h3 className="font-headline font-black text-xl uppercase text-white mb-2">
            Still Have a Question?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
            Our front desk is active on WhatsApp daily from 5:30 AM to 9:00 PM. Ask us anything directly!
          </p>
          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hi! I have a question about the gym.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-headline font-black text-xs uppercase tracking-wider bg-green-500 hover:bg-green-600 text-black shadow-lg transition-all active:scale-95"
          >
            <span>💬</span> Chat With Us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
