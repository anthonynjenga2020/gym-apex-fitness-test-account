import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { insertLead } from '../lib/supabase.js'

export default function ClassBookingModal({ isOpen, onClose, classData, config, selectedDay }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen || !classData) return null

  const handleWhatsAppBooking = async () => {
    const text = `Hi ${config.gymName}! I would like to reserve a spot for:\n\n🏋️‍♂️ Class: ${classData.name}\n📅 Day: ${selectedDay || 'Upcoming'}\n⏰ Time: ${classData.time}\n👤 Coach: ${classData.trainer}\n\nName: ${name || 'Prospective Member'}\nPhone: ${phone || 'Not provided'}`
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    
    try {
      await insertLead({
        gymName: config.gymName,
        name: name || 'WhatsApp Class Booker',
        phone: phone || 'WhatsApp',
        email: email || '',
        goal: 'Class Booking',
        classInterest: classData.name,
        preferredTime: `${selectedDay} ${classData.time}`,
        source: 'class_booking_modal',
      })
    } catch (e) {
      console.error(e)
    }

    window.open(url, '_blank')
    onClose()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await insertLead({
        gymName: config.gymName,
        name,
        phone,
        email,
        goal: 'Class Booking',
        classInterest: classData.name,
        preferredTime: `${selectedDay} ${classData.time}`,
        source: 'class_booking_modal',
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#111111] p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--primary)' }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-500/20 text-green-400 text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-headline font-black uppercase mb-2">Spot Reserved!</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">
              You're all set for <strong>{classData.name}</strong> on {selectedDay} at {classData.time}. We've saved your spot!
            </p>
            <button onClick={onClose} className="btn-primary px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-wider">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-primary">
                Quick Class Reservation
              </span>
              <h2 className="text-2xl font-headline font-black uppercase text-white mt-1">
                Book Your Spot
              </h2>
            </div>

            {/* Class Details Card */}
            <div className="p-4 rounded-xl bg-surface border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <h4 className="font-headline font-bold text-lg text-white uppercase">{classData.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  with <span className="text-gray-200 font-medium">{classData.trainer}</span> · {classData.duration}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black uppercase px-2.5 py-1 rounded bg-primary/15 text-primary">
                  {classData.time}
                </span>
                <p className="text-[10px] text-gray-400 uppercase mt-1">{selectedDay || 'Every Week'}</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Karanja"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3.5 rounded-xl font-headline font-black text-sm uppercase tracking-wider bg-green-500 hover:bg-green-600 text-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <span>💬</span> Confirm Spot on WhatsApp
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-white/40 text-gray-300 transition-colors"
                >
                  {loading ? 'Reserving...' : 'Submit Reservation via Website'}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
