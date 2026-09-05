import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { insertLead } from '../lib/supabase.js'

export default function GoalQuizModal({ isOpen, onClose, config }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    goal: '',
    experience: '',
    time: '',
    name: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const goals = [
    { id: 'fatloss', label: 'Lose Weight & Tone Up', icon: '🔥', desc: 'Burn fat, boost metabolism and lean out.' },
    { id: 'muscle', label: 'Build Muscle & Raw Strength', icon: '💪', desc: 'Hypertrophy, barbell power, and mass building.' },
    { id: 'boxing', label: 'Boxing & Athletic Conditioning', icon: '🥊', desc: 'High-speed combat fitness, stamina & agility.' },
    { id: 'mobility', label: 'Mobility, Yoga & Longevity', icon: '🧘', desc: 'Improve posture, reduce stress & stay flexible.' },
  ]

  const experiences = [
    { id: 'beginner', label: 'Total Beginner', desc: 'First time joining a gym or getting back after years.' },
    { id: 'intermediate', label: 'Intermediate', desc: 'I know standard barbell/dumbbell lifts and train 2-3x a week.' },
    { id: 'advanced', label: 'Advanced Athlete', desc: 'Ready for high intensity, periodized strength & PRs.' },
  ]

  const times = [
    { id: 'morning', label: 'Early Morning (5:30 AM – 8:30 AM)' },
    { id: 'midday', label: 'Midday / Lunch Break (11:30 AM – 2:00 PM)' },
    { id: 'evening', label: 'Evening Peak (5:00 PM – 8:30 PM)' },
    { id: 'weekend', label: 'Weekends (Saturday & Sunday)' },
  ]

  // Dynamic recommendation based on goal
  const getRecommendation = () => {
    if (answers.goal === 'muscle') {
      return {
        program: 'Strength & Hypertrophy Track',
        trainer: config.trainers?.[0]?.name || 'Head Strength Coach',
        trainerSpecialty: 'Periodized Strength & Olympic Lifting',
        trainerImg: config.trainers?.[0]?.image || '/gym (3).jpg',
        badge: 'Recommended for Muscle Gain',
        focus: 'Compound Lifts, Progressive Overload & High Protein Nutrition',
      }
    } else if (answers.goal === 'boxing') {
      return {
        program: 'Combat Fitness & Boxing Conditioning',
        trainer: config.trainers?.[2]?.name || 'Combat Conditioning Coach',
        trainerSpecialty: 'Boxing & High-Intensity Conditioning',
        trainerImg: config.trainers?.[2]?.image || '/gym (6).jpg',
        badge: 'Recommended for Speed & Power',
        focus: 'Heavy Bag Rounds, Footwork & Anaerobic Endurance',
      }
    } else if (answers.goal === 'mobility') {
      return {
        program: 'Functional Mobility & Recovery',
        trainer: config.trainers?.[1]?.name || 'Mobility & Wellness Specialist',
        trainerSpecialty: 'Yoga, Mobility & Functional Movement',
        trainerImg: config.trainers?.[1]?.image || '/gym (5).jpg',
        badge: 'Recommended for Longevity',
        focus: 'Joint Health, Core Stability & Active Recovery',
      }
    }
    return {
      program: '30-Day Total Body Shred & HIIT',
      trainer: config.trainers?.[1]?.name || config.trainers?.[0]?.name || 'Head Coach',
      trainerSpecialty: 'HIIT & Fat Loss Programming',
      trainerImg: config.trainers?.[1]?.image || '/gym (2).jpg',
      badge: 'Recommended for Rapid Fat Loss',
      focus: 'High Caloric Burn, Kettlebells & Metabolic Conditioning',
    }
  }

  const rec = getRecommendation()

  const handleWhatsAppClaim = async () => {
    const text = `Hi ${config.gymName}! I just took your website workout quiz.\n\n🎯 Goal: ${answers.goal}\n📈 Level: ${answers.experience}\n⏰ Preferred Time: ${answers.time}\n✨ Recommended Program: ${rec.program}\n\nI'd like to claim my free 7-Day Trial pass!`
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    
    // Save lead in background
    try {
      await insertLead({
        gymName: config.gymName,
        name: answers.name || 'Quiz User',
        phone: answers.phone || 'WhatsApp Lead',
        goal: answers.goal,
        classInterest: rec.program,
        preferredTime: answers.time,
        source: 'quiz_modal',
      })
    } catch (e) {
      console.error(e)
    }

    window.open(url, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#111111] p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
      >
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--primary)' }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Step {step} of 4
            </span>
            <span className="text-gray-500 text-xs">• Instant Match</span>
          </div>
          <h2 className="text-2xl font-headline font-black uppercase text-white">
            {step === 1 && 'What is your primary fitness goal?'}
            {step === 2 && 'What is your current training experience?'}
            {step === 3 && 'When do you prefer to train?'}
            {step === 4 && 'Your Personalized Workout Plan'}
          </h2>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-3">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setAnswers({ ...answers, goal: g.label })
                  setStep(2)
                }}
                className="w-full flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-surface hover:border-primary hover:bg-white/5 transition-all text-left group"
              >
                <span className="text-3xl shrink-0 p-2 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                  {g.icon}
                </span>
                <div>
                  <h4 className="font-headline font-bold text-white text-base uppercase mb-1">{g.label}</h4>
                  <p className="text-xs text-gray-400">{g.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-3">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  setAnswers({ ...answers, experience: exp.label })
                  setStep(3)
                }}
                className="w-full p-4 rounded-xl border border-white/10 bg-surface hover:border-primary hover:bg-white/5 transition-all text-left"
              >
                <h4 className="font-headline font-bold text-white text-base uppercase mb-1">{exp.label}</h4>
                <p className="text-xs text-gray-400">{exp.desc}</p>
              </button>
            ))}
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Preferred Time */}
        {step === 3 && (
          <div className="space-y-3">
            {times.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setAnswers({ ...answers, time: t.label })
                  setStep(4)
                }}
                className="w-full p-4 rounded-xl border border-white/10 bg-surface hover:border-primary hover:bg-white/5 transition-all text-left font-bold text-sm text-gray-200"
              >
                ⏰ {t.label}
              </button>
            ))}
            <button
              onClick={() => setStep(2)}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 4: Result & Lead Generation */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-primary/40 bg-surface relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-primary">
                  {rec.badge}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                  7-Day Free Pass Ready
                </span>
              </div>

              <h3 className="text-2xl font-headline font-black uppercase text-white mb-2">
                {rec.program}
              </h3>
              <p className="text-xs text-gray-300 mb-4">
                <strong>Core Focus:</strong> {rec.focus}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src={rec.trainerImg}
                  alt={rec.trainer}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Matched Coach</p>
                  <p className="text-sm font-bold text-white">{rec.trainer}</p>
                  <p className="text-[11px] text-primary">{rec.trainerSpecialty}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClaim}
                className="w-full py-4 rounded-xl font-headline font-black text-base uppercase tracking-wider bg-green-500 hover:bg-green-600 text-black flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
              >
                <span>💬</span> Claim 7-Day Free Pass on WhatsApp
              </button>

              <button
                onClick={() => {
                  onClose()
                  document.getElementById('free-trial')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-white/30 text-gray-300 transition-colors"
              >
                Or Book via Website Form
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
